console.log("score-board");

/**
 *  Player Class as a blueprint for creating player objects, Own name, date and score
 */
class Player {
  constructor(name, date, score) {
    this.name = name;
    this.date = new Date(date);
    this.score = score;
  }

  getFormattedDate() {
    return this.date.toLocaleDateString();
  }
}

/**
 *  Player Array, showing past players and scores on this quiz
 */
// LEADERBOARD — POPULATED BY SAVED PLAYER SCORES
const players = [];

// SAVED SCORES — RESTORE PREVIOUS GAMES FROM THIS BROWSER
const scoreStorageKey = "cheshire-quiz-scores";

try {
  const saved = JSON.parse(localStorage.getItem(scoreStorageKey) || "[]");

  if (Array.isArray(saved)) {
    saved.forEach((player) => {
      if (
        typeof player.name === "string" &&
        Number.isInteger(player.score) &&
        player.score >= 0 &&
        player.score <= 10 &&
        Number.isFinite(Date.parse(player.date))
      ) {
        players.push(new Player(player.name, player.date, player.score));
      }
    });
  }
} catch (error) {
  console.error("Unable to restore saved scores:", error);
}

/**
 * Generating a table, sorted by player scores, in desending order, each player has their own row
 */
export function displayLeaderboard() {
  let leaderboardHTML =
    "<table><tr><th>Name</th><th>Score</th><th>Date</th></tr>";
  players.sort((aPlayer, bPlayer) => bPlayer.score - aPlayer.score);
  players.forEach((player) => {
    leaderboardHTML += `<tr>
            <td>${escapeHTML(player.name)}</td>
            <td>${player.score}</td>
            <td>${player.getFormattedDate()}</td>
        </tr>`;
  });
  leaderboardHTML += "</table>";
  document.getElementById("leaderboard").innerHTML = leaderboardHTML;
}

/**
 * Function to add a new player to the leaderboard
 */
// SAVE SCORE — KEEP NEW RESULTS AFTER THE PAGE CLOSES
export function addPlayer(name, date, score) {
  const playerName = typeof name === "string" ? name.trim() : "";

  if (!playerName || !Number.isInteger(score) || score < 0 || score > 10) {
    return;
  }

  // Use today's actual date rather than parsing a regional date string.
  players.push(new Player(playerName, new Date(), score));

  try {
    const savedPlayers = players;

    localStorage.setItem(scoreStorageKey, JSON.stringify(savedPlayers));
  } catch (error) {
    console.error("Unable to save scores:", error);
  }

  displayLeaderboard();
}

/**
 * Utility function to escape HTML
 */
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
