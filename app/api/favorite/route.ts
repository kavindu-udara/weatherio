
import { NextResponse } from 'next/server';
import Favorite from '@/models/Favorite';
import { getSessionCurrentUser } from '@/lib/session';
import { dbConnect } from '@/database/dbConnect';

export async function GET(request: Request) {

    let loggedUser;

    try {
        const user = await getSessionCurrentUser();
        loggedUser = user;
    } catch (err : any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }

    if (!loggedUser) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await Favorite.find({ userId: loggedUser.id });
    return NextResponse.json({ message: "Data found", favorites: data }, { status: 200 });

}

export async function POST(request: Request) {
    const body = await request.json();
    const { name, lat, long } = body as { name: string; lat: number; long: number };

    if (!name || !lat || !long) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    let loggedUser;
    try {
        const user = await getSessionCurrentUser();
        loggedUser = user;
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 401 });
    }

    if (loggedUser) {
        await dbConnect();

        try {

            const alreadyHasFavorite = await Favorite.findOne({ userId: loggedUser.id, latitude: lat, longitude: long });
            console.log(alreadyHasFavorite)

            if (alreadyHasFavorite?._id) {
                return NextResponse.json({ error: "Already exist" }, { status: 400 });
            }

            const newFavorite = new Favorite({
                userId: loggedUser.id,
                name: name,
                latitude: lat,
                longitude: long
            });
            const savedFavorite = await newFavorite.save();

            return NextResponse.json(
                {
                    message: "Added to favorite",
                    data: savedFavorite,
                },
                { status: 201 }
            );

        } catch (error) {
            console.error("Error saving favorite:", error);
            return NextResponse.json({ message: "Error while adding to favorite" }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


}
