import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }
function getSlugByAcronym(ShortName: string) {
  const data = {
    result: {
      data: {
        json: [
          { acronym: "COFC", slug: "maroon-and-white" },
          { acronym: "GCU", slug: "havoc-horde" },
          { acronym: "OAK", slug: "grizz-gang" },
          { acronym: "COLG", slug: "raiders-rally" },
          { acronym: "SPU", slug: "peacock-pride" },
          { acronym: "UV", slug: "catamount-nation" },
          { acronym: "HOU", slug: "coog-crew" },
          { acronym: "WIS", slug: "badger-nation" },
          { acronym: "BYU", slug: "cougar-faithful" },
          { acronym: "COL", slug: "buff-nation" },
          { acronym: "UF", slug: "gator-nation" },
          { acronym: "NW", slug: "wildcat-alliance" },
          { acronym: "SC", slug: "garnet-nation" },
          { acronym: "UVA", slug: "hoo-crew" },
          { acronym: "ZAG", slug: "the-zags" },
          { acronym: "DUQ", slug: "duke-dynasty" },
          { acronym: "JMU", slug: "bulldog-legion" },
          { acronym: "DEL", slug: "hen-nation" },
          { acronym: "SIN", slug: "scream-circle" },
          { acronym: "RICE", slug: "owl-watch" },
          { acronym: "KU", slug: "rock-chalk-nation" },
          { acronym: "BAY", slug: "bear-nation" },
          { acronym: "LON", slug: "lancer-strong" },
          { acronym: "TENN", slug: "rocky-top" },
          { acronym: "UT", slug: "hookem-nation" },
          { acronym: "SDSU", slug: "aztec-empire" },
          { acronym: "MSU", slug: "sparty-nation" },
          { acronym: "MTS", slug: "bobcat-backers" },
          { acronym: "STET", slug: "hatter-horde" },
          { acronym: "LBU", slug: "the-beach" },
          { acronym: "HOW", slug: "blue-stampede" },
          { acronym: "WKU", slug: "the-red-towel" },
          { acronym: "NAL", slug: "purple-and-gold" },
          { acronym: "LOC", slug: "rambler-faithful" },
          { acronym: "BUT", slug: "bulldog-battalion" },
          { acronym: "CONN", slug: "husky-nation" },
          { acronym: "CREI", slug: "jay-nation" },
          { acronym: "BING", slug: "bearcat-circle" },
          { acronym: "LOU", slug: "the-ville" },
          { acronym: "UCR", slug: "high-ground" },
          { acronym: "CAMP", slug: "cam-family" },
          { acronym: "LIB", slug: "flames-up" },
          { acronym: "SHOU", slug: "bearkcat-pack" },
          { acronym: "DAY", slug: "flyer-faithful" },
          { acronym: "ALA", slug: "crimson-nation" },
          { acronym: "WAG", slug: "seahawk-circle" },
          { acronym: "CSU", slug: "ram-nation" },
          { acronym: "STAN", slug: "cardinal-reign" },
          { acronym: "OMA", slug: "mav-circle" },
          { acronym: "GST", slug: "panther-pride" },
          { acronym: "KNST", slug: "owl-family" },
          { acronym: "SJU", slug: "the-red-storm" },
          { acronym: "QUE", slug: "royal-regent" },
          { acronym: "RMU", slug: "the-colony" },
          { acronym: "COLU", slug: "lion-society" },
          { acronym: "RID", slug: "broncs-rise" },
          { acronym: "SIEN", slug: "saints-row" },
          { acronym: "CMU", slug: "the-chips" },
          { acronym: "BU", slug: "brave-brigade" },
          { acronym: "SEMO", slug: "the-red-rising" },
          { acronym: "ORE", slug: "duck-nation" },
          { acronym: "SU", slug: "orange-crush" },
          { acronym: "EKU", slug: "colonel-crew" },
          { acronym: "BCU", slug: "cook-crew" },
          { acronym: "MST", slug: "hail-state" },
          { acronym: "TCU", slug: "horned-legion" },
          { acronym: "WSU", slug: "wazzu-pride" },
          { acronym: "STB", slug: "the-sea-pack" },
          { acronym: "TOW", slug: "tow-together" },
          { acronym: "ORST", slug: "beaver-brigade" },
          { acronym: "ILL", slug: "illini-nation" },
          { acronym: "FUR", slug: "purple-loyal" },
          { acronym: "WOF", slug: "terrier-tribe" },
          { acronym: "NOLA", slug: "privateer-pride" },
          { acronym: "TAMC", slug: "lion-circle" },
          { acronym: "ION", slug: "the-gael-guard" },
          { acronym: "MARI", slug: "the-fox-den" },
          { acronym: "A&M", slug: "aggie-nation" },
          { acronym: "FAU", slug: "owl-pack" },
          { acronym: "DRAK", slug: "bulldog-brigade" },
          { acronym: "TTU", slug: "sclaret-and-black" },
          { acronym: "FAIR", slug: "stag-force" },
          { acronym: "NAR", slug: "lumber-legion" },
          { acronym: "BELL", slug: "knights-watch" },
          { acronym: "STM", slug: "gael-force" },
          { acronym: "MAN", slug: "jasper-loyal" },
          { acronym: "ZONA", slug: "wildcat-nation" },
          { acronym: "NEB", slug: "husker-horde" },
          { acronym: "UNM", slug: "lobo-legion" },
          { acronym: "BUFF", slug: "the-bullhorn" },
          { acronym: "ULL", slug: "ragin-nation" },
          { acronym: "DUKE", slug: "the-dukies" },
          { acronym: "LONG", slug: "lancer-strong" },
          { acronym: "USU", slug: "aggie-alliance" },
          { acronym: "PUR", slug: "boiler-up" },
          { acronym: "GRAM", slug: "black-and-gold" },
          { acronym: "SMC", slug: "gael-force" },
          { acronym: "MARQ", slug: "the-flock" },
          { acronym: "AUB", slug: "war-eagle-nation" },
          { acronym: "YALE", slug: "bulldog-society" },
          { acronym: "UVM", slug: "catamount-nation" },
          { acronym: "UAB", slug: "blazer-alliance" },
          { acronym: "CLEM", slug: "tiger-family" },
          { acronym: "COLO", slug: "buff-nation" },
          { acronym: "FLA", slug: "gator-nation" },
          { acronym: "NU", slug: "wildcat-alliance" },
          { acronym: "TA&M", slug: "aggie-nation" },
        ],
      },
    },
  };

  // Find matching acronym and return corresponding slug
  const match = data.result.data.json.find(
    (item) => item.acronym === ShortName
  );
  return match ? match.slug : null;
}

// Function to fetch data from ESPN API
async function fetchESPNData(i: number) {
  try {
    const response = await fetch(
      "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard"
    );
    const data = await response.json();
    // Use ESPN data to populate the frame
    // Extract information about the next game
    const events = data.events;
    const length = events.length;
    // const randomIndex = Math.floor(Math.random() * length);
    const nextGame = events[i]; // Assuming the first event is the next game

    // Extract relevant information
    const homeTeamData = nextGame.competitions[0].competitors[0].team;
    const awayTeamData = nextGame.competitions[0].competitors[1].team;
    const homeTeamLogoUrl = homeTeamData.logo;
    const awayTeamLogoUrl = awayTeamData.logo;
    const homeTeam = homeTeamData.shortDisplayName;
    const awayTeam = awayTeamData.shortDisplayName;
    const homeTeamShort = homeTeamData.abbreviation;
    const awayTeamShort = awayTeamData.abbreviation;
    // const homeTeamAlt = homeTeamData.alternateColor;
    const homeTeamColor = homeTeamData.color;
    const awayTeamColor = awayTeamData.color;
    const awayTeamAlt = awayTeamData.alternateColor;
    const homeTeamAlt = homeTeamData.alternateColor;

    let broadcastName = "";
    if (
      nextGame &&
      nextGame.competitions &&
      nextGame.competitions[0] &&
      nextGame.competitions[0].broadcasts &&
      nextGame.competitions[0].broadcasts[0] &&
      nextGame.competitions[0].broadcasts[0].names &&
      nextGame.competitions[0].broadcasts[0].names.length > 0
    ) {
      broadcastName = nextGame.competitions[0].broadcasts[0].names[0];
    }

    const gameTime = new Date(nextGame.date);
    const formattedDayAndTime = () => {
      const today = new Date();
      if (gameTime.toDateString() === today.toDateString()) {
        return `Today ${gameTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "America/New_York",
        })} ET`;
      } else {
        return `${gameTime.toLocaleString("en-US", {
          weekday: "long",
          timeZone: "America/New_York",
        })} ${gameTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          timeZone: "America/New_York",
        })}`;
      }
    };
    const gameDay = formattedDayAndTime();
    const homeTeamScore = nextGame.competitions[0].competitors[0].score;
    const awayTeamScore = nextGame.competitions[0].competitors[1].score;
    const gameState = nextGame.status.type.state;
    const homeSlug = getSlugByAcronym(homeTeamShort);
    const awaySlug = getSlugByAcronym(awayTeamShort);
    let clock;
    let oddsDetails = "";

    if (gameState === "pre") {
      // Extract odds details if available
      clock = gameDay;
      if (
        nextGame &&
        nextGame.competitions &&
        nextGame.competitions[0] &&
        nextGame.competitions[0].odds &&
        nextGame.competitions[0].odds[0]
      ) {
        oddsDetails = nextGame.competitions[0].odds[0].details;
      }
    } else {
      clock = nextGame.status.type.detail;
    }
    return {
      length,
      homeTeam,
      awayTeam,
      homeTeamShort,
      awayTeamShort,
      homeTeamLogoUrl,
      awayTeamLogoUrl,
      homeTeamColor,
      awayTeamColor,
      homeTeamAlt,
      awayTeamAlt,
      broadcastName,
      gameTime,
      gameDay,
      homeTeamScore,
      awayTeamScore,
      gameState,
      oddsDetails,
      clock,
      homeSlug,
      awaySlug,
    };
  } catch (error) {
    console.error("Error fetching ESPN data:", error);
    return null;
  }
}

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

app.frame("/", (c) => {
  // const { buttonValue, status } = c;
  return c.res({
    action: "/0",
    image: (
      <div
        style={{
          alignItems: "center",
          background: "white",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <img
          alt="Home Team"
          height={400}
          src="https://bracket.game/favicons/apple-touch-icon.png"
          style={{ margin: "0 2px" }}
          width={400}
        />
        <div
          style={{
            color: "#2F5FF6",
            fontSize: 100,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 0,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
            fontWeight: "bold",
            fontFamily: "Inter",
          }}
        >
          Bracket.Game
        </div>
      </div>
    ),
    intents: [<Button value="next">View Games</Button>],
  });
});
const games = await fetchESPNData(0);
for (let i = 0; i < games?.length; i++) {
  app.frame(`/${i}`, async (c) => {
    // const { buttonValue } = c;
    const espnData = await fetchESPNData(i);
    console.log(espnData);
    // Define the action for the "back" button
    let backAction = i > 0 ? `/${i - 1}` : `/`;
    // Define the action for the "next" button
    let nextAction = i < espnData?.length - 1 ? `/${i + 1}` : null;
    let homeSlug = espnData?.homeSlug;
    let awaySlug = espnData?.awaySlug;
    // Example usage:
    return c.res({
      // action: action,
      image: (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            fontSize: 54,
            fontWeight: 600,
            color: "black",
            fontFamily: "Inter",
          }}
        >
          <div style={{ marginBottom: 85 }}>{espnData?.clock}</div>
          <div
            style={{
              height: "40%",
              width: "80%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                height: "400px",
                width: "400px",
                borderRadius: "50%",
                backgroundColor: `#${espnData?.homeTeamColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Your shape or content goes here */}
              <span
                style={{
                  fontSize: "130px",
                  color: "#" + espnData?.homeTeamAlt,
                }}
              >
                {espnData?.homeTeamShort}
              </span>
            </div>
            <div
              style={{
                height: "400px",
                width: "400px",
                borderRadius: "50%",
                backgroundColor: `#${espnData?.awayTeamColor}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Your shape or content goes here */}
              <span
                style={{
                  fontSize: "130px",
                  color: "#" + espnData?.awayTeamAlt,
                }}
              >
                {espnData?.awayTeamShort}
              </span>
            </div>
          </div>

          {/* Conditionally render based on gameState */}
          {espnData?.gameState === "pre" ? (
            <>
              <div
                style={{
                  marginTop: 75,
                }}
              >
                {espnData?.oddsDetails}
              </div>
            </>
          ) : (
            <div
              style={{
                marginTop: 75,
                display: "flex",
                flexDirection: "row",
                width: "35%",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 60,
              }}
            >
              <div>{espnData?.homeTeamScore}</div>
              <div>{espnData?.awayTeamScore}</div>
            </div>
          )}
        </div>
      ),
      intents: [
        <Button value="back" action={backAction}>
          Back
        </Button>,
        <Button.Link href={`https://bracket.game/${homeSlug}`}>
          {" "}
          {espnData?.homeTeamShort}
        </Button.Link>,
        <Button.Link href={`https://bracket.game/${awaySlug}`}>
          {" "}
          {espnData?.awayTeamShort}
        </Button.Link>,
        nextAction ? (
          <Button value="next" action={nextAction}>
            Next
          </Button>
        ) : (
          <Button.Reset>Reset</Button.Reset>
        ),
      ].filter(Boolean),
    });
  });
}
if (import.meta.env?.MODE === "development") devtools(app, { serveStatic });
else devtools(app, { assetsPath: "/.frog" });

export const GET = handle(app);
export const POST = handle(app);
