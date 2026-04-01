import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    firstName,
    lastName,
    email,
    phone,
    peopleToOccupyProperty,
    occupation,
    hasVehicle,
    hasPet,
    beenEvicted,
    paymentMethod,
    movingDate,
    signature,
  } = body;

  console.log(process.env.DATABASE_URL, "database url");

  const client = await pool.connect();
  const data = {
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone_number: phone,
    occupation: occupation,
    people_to_occupy: peopleToOccupyProperty,
    has_vehicle: hasVehicle,
    has_pet: hasPet,
    been_evicted: beenEvicted,
    payment_method: paymentMethod,
    moving_date: movingDate,
    signature: movingDate,
  };

  try {
    const result = await client.query(
      `INSERT INTO application_form (email,last_name,first_name,phone_number,occupation,people_to_occupy,has_vehicle,has_pet,been_evicted,payment_method,moving_date, signature) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
      [
        data.email,
        data.last_name,
        data.first_name,
        data.phone_number,
        data.occupation,
        data.people_to_occupy,
        data.has_vehicle,
        data.has_pet,
        data.been_evicted,
        data.payment_method,
        data.moving_date,
        data.signature,
      ],
    );

    return Response.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("DB ERROR:", error);
    return Response.json(
      { error: "Unable to add user at this time" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}

export async function GET() {
  console.log(process.env.DATABASE_URL, "database url");

  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT * FROM application_form
      ORDER BY id ASC 
      `,
    );

    return Response.json({ data: result.rows }, { status: 201 });
  } catch (error) {
    console.error("DB ERROR:", error);
    return Response.json({ error: "Unable to get data" }, { status: 500 });
  } finally {
    client.release();
  }
}
