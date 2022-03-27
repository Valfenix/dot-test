import { useState } from "react";
import axios from "axios";
import cuid from "cuid";
import { loremIpsum } from "lorem-ipsum";
import API_URL from "../utils/baseUrl";

interface Pageview {
  id: string;
  created_at: Date;

  page: {
    title: string;
    description: string;
    tags: string[];
  };

  user: {
    id: string;
    created_at: Date;
  };
}

const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const usePageviewGenerator = () => {
  const [pageview, setPageview] = useState<Pageview | null>(null);

  const generate = async () => {
    const event: Pageview = {
      id: cuid(),
      created_at: new Date(),

      page: {
        title: loremIpsum(),
        description: loremIpsum({ count: 3 }),
        tags: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          loremIpsum({ units: "words", count: 1 })
        ),
      },

      user: {
        id: `USER${cuid()}`,
        created_at: randomDate(new Date(2019, 0, 1), new Date()),
      },
    };

    // Data Object
    const data = {
      event_id: event.id,
      event_date: event.created_at,
      page_title: event.page.title,
      page_description: event.page.description,
      page_tags: event.page.tags,
      user_id: event.user.id,
      user_joined: event.user.created_at,
    };

    //send data to datastore
    try {
      let res = await axios({
        method: "post",
        url: `${API_URL}/post/create`,
        data: data,
      });

      if (res.status === 201) {
        console.log("Post sent");
      } else {
        console.log("Something unexpected happened");
      }
    } catch (err) {
      console.log(err);
    }

    setPageview(event);
  };

  return {
    generate,
    pageview,
  };
};
