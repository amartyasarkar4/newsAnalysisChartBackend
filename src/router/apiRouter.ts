import express, { Request, Response, Router } from "express";
import { MyData } from "../models/jsonData";
import { devNull } from "os";

const apiRouter = Router();

apiRouter.get("/helloRouter", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    // const movie = await MyData.aggregate().sortByCount("country");

    // const movie = await MyData.aggregate([
    //   {
    //     $group: {
    //       _id: { country: "$country", topic: "$topic" },
    //       count: { $sum: 1 }, // this means that the count will increment by 1
    //     },
    //   },
    // ]);

    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            country: "$country",
            end_year: "$end_year",
            // topic: "$topic",
          },
          total_intensity: { $sum: "$intensity" },
          count: { $sum: 1 }, // count the documents in each group
          // Add more fields as needed
          // For example, if you want to include `sector` and `url`, you can do this:
          //   sector: { $first: "$sector" }, // you can use $first since it should be the same within a group
          //   url: { $first: "$url" }, // you can use $first since it should be the same within a group
          // Add more fields if needed
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field from the output
          country: "$_id.country",
          end_year: "$_id.end_year",
          topic: "$_id.topic",
          total_intensity: 1,
          count: 1,
          //   sector: 1,
          //   url: 1,
          // Add more fields if needed
        },
      },
    ]);

    // const movie = await MyData.aggregate().sortByCount({
    //   $mergeObjects: ["$country", "$source"],
    // });

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/helloIntensity", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            intensity: "$intensity",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/helloimpact", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            intensity: "$impact",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellorelevance", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            intensity: "$relevance",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellolikelihood", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            intensity: "$likelihood",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellosector", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: "$sector",
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellotopics", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            topics: "$topic",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/helloregion", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            intensity: "$region",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

const allPestlesFetch = async () => {
  const fetchedData = await MyData.aggregate([
    {
      $group: {
        _id: { $toLower: "$pestle" },
      },
    },
  ]);
  // const pestlewithcount0 = new Map<[key:string], number>();
  // interface StringNumberMap {
  //   [key: string]: number;
  // }

  // const pestlewithcount0: StringNumberMap = {};

  // fetchedData.map((each, i) => {
  //   pestlewithcount0[`${each._id}`] = 0;
  // });
  return fetchedData;
};

apiRouter.get("/region_to_pestle", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const allPestlesmap0 = await allPestlesFetch();

    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            region: { $toLower: "$region" },
            pestle: { $toLower: "$pestle" },
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
      {
        $group: {
          _id: "$_id.region", // Group by field1
          subPestles: {
            $push: {
              pestle: "$_id.pestle",
              count: "$count",
            },
          },

          total: { $sum: "$count" }, // Optionally calculate total count per group
        },
      },
    ]);

    // movie.map((each) => {
    //   let evryMp = allPestlesmap0;
    //   each.subPestles.map((sng: any) => {
    //     evryMp[`${sng.pestle}`] = sng.count;
    //   });

    //   each["pestleWise"] = evryMp;
    // });

    console.log("here is your movie dat", movie);
    console.log("alll", allPestlesmap0);

    res.send({ allPestlesmap0, mv: movie });
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get(
  "/sector_to_avgRelevanceAndIntensity",
  async (req: Request, res: Response) => {
    console.log("enterrrrrrr");
    try {
      const allPestlesmap0 = await allPestlesFetch();

      const movie = await MyData.aggregate([
        {
          $group: {
            _id: { $toLower: "$sector" },
            averageRelevance: { $avg: "$relevance" },
            averageIntensity: { $avg: "$intensity" },
          },
        },
      ]);

      // movie.map((each) => {
      //   let evryMp = allPestlesmap0;
      //   each.subPestles.map((sng: any) => {
      //     evryMp[`${sng.pestle}`] = sng.count;
      //   });

      //   each["pestleWise"] = evryMp;
      // });

      console.log("here is your movie dat", movie);

      res.send(movie);
    } catch (e) {
      console.log("error;;", e);
    }
  }
);

apiRouter.get(
  "/sector_to_avgLikelihood",
  async (req: Request, res: Response) => {
    console.log("enterrrrrrr");
    try {
      const allPestlesmap0 = await allPestlesFetch();

      const fetched = await MyData.aggregate([
        {
          $group: {
            _id: { $toLower: "$sector" },
            averagelikelihood: { $avg: "$likelihood" },
          },
        },
      ]);

      console.log("here is your movie dat", fetched);

      res.send(fetched);
    } catch (e) {
      console.log("error;;", e);
    }
  }
);

apiRouter.get(
  "/pestle_to_avgLikelihood",
  async (req: Request, res: Response) => {
    console.log("enterrrrrrr");
    try {
      const allPestlesmap0 = await allPestlesFetch();

      const fetched = await MyData.aggregate([
        {
          $group: {
            _id: { $toLower: "$pestle" },
            averagelikelihood: { $avg: "$likelihood" },
          },
        },
      ]);

      console.log("here is your movie dat", fetched);

      res.send(fetched);
    } catch (e) {
      console.log("error;;", e);
    }
  }
);

apiRouter.get(
  "/pestle_to_avgRelevanceAndIntensity",
  async (req: Request, res: Response) => {
    try {
      const fetch = await MyData.aggregate([
        {
          $group: {
            _id: { $toLower: "$pestle" },
            averageRelevance: { $avg: "$relevance" },
            averageIntensity: { $avg: "$intensity" },
          },
        },
      ]);

      res.send(fetch);
    } catch (e) {
      console.log("error;;", e);
    }
  }
);

apiRouter.get("/hellostart_year", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: "$start_year",
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/helloend_year", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: "$end_year",
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellopublished", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      // {
      //   $project: {
      //     year: { $substr: ["$published", -13, -9] }, // Extract the year from the date string
      //   },
      // },
      {
        $group: {
          _id: "$published",
          count: { $sum: 1 }, // count the documents in each group
        },
        // $project: {
        //   _id: 0,
        //   // pubYear: new Date("$_id").getFullYear(),
        //   count: 1,
        // },
      },
    ]);

    // movie.forEach((each) => {
    //   each["pubYear"] = new Date(each._id).getFullYear();
    // });

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellocountry", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            country: "$country",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellopestle", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            pestle: "$pestle",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/hellosource", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: {
            source: "$source",
          },
          count: { $sum: 1 }, // count the documents in each group
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});

apiRouter.get("/helloIntensity2", async (req: Request, res: Response) => {
  console.log("enterrrrrrr");
  try {
    const movie = await MyData.aggregate([
      {
        $group: {
          _id: null,
          max_value: { $max: "$intensity" },
          min: { $min: "$relevance" },
          second_max_value: {
            $max: {
              $cond: [
                { $ne: ["$relevance", "$max_value"] },
                "$relevance",
                null,
              ],
            },
          },
          second_min_value: {
            $max: {
              $cond: [
                { $ne: ["$intensity", "$min_value"] },
                "$intensity",
                null,
              ],
            },
          },
        },
      },
    ]);

    console.log("here is your movie dat", movie);
    res.send(movie);
  } catch (e) {
    console.log("error;;", e);
  }
});
export default apiRouter;
