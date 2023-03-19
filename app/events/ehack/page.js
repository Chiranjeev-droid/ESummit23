import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";
import "../../../styles/landing.css";

async function getUserData(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  let userArray;
  if (session) {
    const userData = await getUserData(session);
    userArray = userData?.user.registeredEvents;
  }

  const check = session && userArray[1];
  return (
    <div class="event-sec">
      <div class="event_wrapper">
        <h1 class="event_h1">
          E-Hack
          <br />‍
        </h1>
        <p class="event_date">Date &amp; Time</p>
        <p class="event_para">
          Venue
          <br />‍
        </p>
        <p class="form_para_small">
          Prominent motivational speakers from the entrepreneurial environment
          will be delivering a talk to inspire the students and promote the
          ethos of entrepreneurship in the campus. This session will also be
          open to questions from the audience, thus furnishing the minds of the
          students with vivid ideas and a clearer picture of the
          entrepreneurship realm.
          <br />‍
        </p>
        <div class="evet_price_wrap">
          <div class="price_wrap">
            <p class="para_med_event">1st</p>
            <p class="para_bold_event">10,000</p>
          </div>
          <div class="price_wrap">
            <p class="para_med_event">2nd</p>
            <p class="para_bold_event">10,000</p>
          </div>
          <div class="price_wrap">
            <p class="para_med_event">3rd</p>
            <p class="para_bold_event">10,000</p>
          </div>
        </div>

        <Link
          className="eventbtn w-button"
          href={`${check ? "/manage/ehack" : "/"}`}
        >
          {`${check ? "Go to Dashboard" : "Go to Register"}`}
        </Link>
      </div>
    </div>
  );
}
// {session && userArray[1] && <Link className="eventbtn w-button" href="/manage/ehack">
// Go to Dashboard
// </Link>}
