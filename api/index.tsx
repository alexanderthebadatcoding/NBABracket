import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { serveStatic } from "frog/serve-static";
import { handle } from "frog/vercel";

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: "edge",
// };

async function fetchDataAndFindSlug(slugName) {
  try {
    // Construct the URL with the provided slug name
    const url = `https://api.bracket.game/trpc/collective.getPrices?batch=1&input=%7B%220%22%3A%7B%22contract%22%3A%22nba%22%2C%22currency%22%3A%22USDC%22%7D%7D`;

    // Fetch data from the URL
    const response = await fetch(url);
    const jsonData = await response.json();

    // console.log("Fetched Data:", jsonData); // Log the fetched data

    // Initialize matching slug and voteCount
    let matchingSlug;
    let voteCount;

    // Check if the data and json properties exist in the result
    if (jsonData.length > 0 && jsonData[0].result && jsonData[0].result.data) {
      const data = jsonData[0].result.data;
      // Check if the data object has a json property and it's an array
      if (data.json && Array.isArray(data.json)) {
        // Iterate over the json array
        for (const item of data.json) {
          if (item.slug === slugName) {
            matchingSlug = item.slug;
            voteCount = item.voteCount / 100;
            break;
          }
        }
      }
    }

    // Log or return the matching slug and voteCount
    // console.log("Matching Slug:", matchingSlug);
    // console.log("Vote Count:", voteCount);
    return { slug: matchingSlug, voteCount };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function with the desired slug name
// fetchDataAndFindSlug("bucks-nation");

function newShade(hexColor: string, magnitude: number): string {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
}

function getSlugByAcronym(ShortName: string) {
  const data = {
    result: {
      data: {
        json: [
          { acronym: "BOS", slug: "celtics-nation" },
          { acronym: "CHI", slug: "bulls-nation" },
          { acronym: "OKC", slug: "thunder-nation" },
          { acronym: "NYK", slug: "knickerbockers" },
          { acronym: "NY", slug: "knickerbockers" },
          { acronym: "DEN", slug: "nuggets-nation" },
          { acronym: "MIL", slug: "bucks-nation" },
          { acronym: "MIN", slug: "wolves-nation" },
          { acronym: "NOP", slug: "pels-faithful" },
          { acronym: "NO", slug: "pels-faithful" },
          { acronym: "CLE", slug: "cavs-nation" },
          { acronym: "LAC", slug: "clips-nation" },
          { acronym: "ORL", slug: "magic-nation" },
          { acronym: "DAL", slug: "mffls" },
          { acronym: "IND", slug: "pacers-nation" },
          { acronym: "PHX", slug: "sunsationals" },
          { acronym: "LAL", slug: "lakers-nation" },
          { acronym: "PHI", slug: "the-sixth-man" },
          { acronym: "SAC", slug: "kings-court" },
          { acronym: "MIA", slug: "heat-nation" },
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
      "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard"
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
    const awayTeamAlt = newShade(awayTeamData.alternateColor, 20);
    const homeTeamAlt = newShade(homeTeamData.alternateColor, 20);
    const homeBG = newShade(homeTeamColor, 69);
    const awayBG = newShade(awayTeamColor, 69);

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
    let headline = "";
    if (
      nextGame.competitions &&
      nextGame.competitions[0] &&
      nextGame.competitions[0].notes &&
      nextGame.competitions[0].notes[0] &&
      nextGame.competitions[0].notes[0].headline
    ) {
      headline = nextGame.competitions[0].notes[0].headline;
    }

    const gameTime = new Date(nextGame.date);
    const formattedDayAndTime = () => {
      // Create a new Date object for the current date and time
      const today = new Date();

      const checkDay = today.toLocaleString("en-US", {
        weekday: "long",
        timeZone: "America/New_York",
      });

      // console.log(checkDay);

      const gametimeSimple = gameTime.toLocaleString("en-US", {
        weekday: "long",
        timeZone: "America/New_York",
      });
      // console.log(gametimeSimple);

      if (checkDay === gametimeSimple) {
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
        })} ET`;
      }
    };
    const gameDay = formattedDayAndTime();
    const homeTeamScore = nextGame.competitions[0].competitors[0].score;
    const awayTeamScore = nextGame.competitions[0].competitors[1].score;
    const gameState = nextGame.status.type.state;
    const homeSlug = getSlugByAcronym(homeTeamShort);
    const awaySlug = getSlugByAcronym(awayTeamShort);
    const homeTeamBracketData = await fetchDataAndFindSlug(homeSlug);
    const homeTeamPrice = homeTeamBracketData?.voteCount;
    const awayTeamBracketData = await fetchDataAndFindSlug(awaySlug);
    const awayTeamPrice = awayTeamBracketData?.voteCount;

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
    } else if (gameState === "post") {
      clock = headline;
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
      homeBG,
      awayBG,
      homeTeamPrice,
      awayTeamPrice,
      headline,
    };
  } catch (error) {
    console.error("Error fetching ESPN data:", error);
    return null;
  }
}

export const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  browserLocation: "/",
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
            fontFamily: "ui-sans-serif,system-ui,sans-serif",
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
    // let backAction = i > 0 ? `/${i - 1}` : `/`;
    // Define the action for the "next" button
    let nextAction = i < espnData?.length - 1 ? `/${i + 1}` : null;
    let homeSlug = espnData?.homeSlug;
    let awaySlug = espnData?.awaySlug;
    // const leftArrow = "\u2190"; // Left arrow ←
    const rightArrow = "\u2192";
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
            backgroundImage: `linear-gradient(to right, ${espnData?.homeBG}, #fff, ${espnData?.awayBG})`,
            fontSize: 66,
            fontWeight: 900,
            color: "black",
            fontFamily: '"Inter"',
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
              {espnData?.gameState === "pre" ? (
                <span
                  style={{
                    fontSize: "130px",
                    color: espnData?.homeTeamAlt,
                    fontStyle: "italic",
                  }}
                >
                  {espnData?.homeTeamShort}
                </span>
              ) : (
                <span
                  style={{ fontSize: "160px", color: espnData?.homeTeamAlt }}
                >
                  {espnData?.homeTeamScore}
                </span>
              )}
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
              {espnData?.gameState === "pre" ? (
                <span
                  style={{
                    fontSize: "130px",
                    color: espnData?.awayTeamAlt,
                    fontStyle: "italic",
                  }}
                >
                  {espnData?.awayTeamShort}
                </span>
              ) : (
                <span
                  style={{ fontSize: "160px", color: espnData?.awayTeamAlt }}
                >
                  {espnData?.awayTeamScore}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: 75,
              display: "flex",
              width: "65%",
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "space-between",
            }}
          >
            <span>🎩 {espnData?.homeTeamPrice}</span>
            <span>🎩 {espnData?.awayTeamPrice}</span>
          </div>
        </div>
      ),
      intents: [
        <Button.Link href={`https://bracket.game/${homeSlug}`}>
          {" "}
          {espnData?.homeTeamShort}
        </Button.Link>,
        <Button.Link href={`https://bracket.game/${awaySlug}`}>
          {" "}
          {espnData?.awayTeamShort}
        </Button.Link>,
        // <Button value="back" action={backAction}>
        //   {leftArrow}
        // </Button>,
        nextAction ? (
          <Button value="next" action={nextAction}>
            {rightArrow}
          </Button>
        ) : (
          <Button.Reset>Start Over</Button.Reset>
        ),
      ].filter(Boolean),
    });
  });
}
if (import.meta.env?.MODE === "development") devtools(app, { serveStatic });
else devtools(app, { assetsPath: "/.frog" });

export const GET = handle(app);
export const POST = handle(app);
