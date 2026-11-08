# Life Simulator

A browser-based life simulation game built with HTML, CSS and JavaScript.

Create your own character, manage daily needs, earn money, collect items, explore Halloween night and experience unexpected events.

## Play the Game

Open the game here:

**https://fah67425.github.io/life-simulator/**

## How to Play

### 1. Create Your Character
- Enter your character's name.
- Choose a gender.
- Set your character's age.
- Start your virtual life.

### 2. Manage Your Character

Keep these four stats under control:

| Stat | What it means |
|---|---|
| Money | Your available money |
| Hunger | How full your character is |
| Energy | How much energy your character has |
| Happiness | Your character's mood |

Your needs change as in-game time passes. Make sure you manage them carefully.

### 3. Perform Daily Actions

You can choose from four main actions:

| Action | Effect |
|---|---|
| Eat | Costs $10, restores 25 hunger and takes 30 minutes |
| Sleep | Restores 35 energy, reduces hunger by 10 and takes 8 hours |
| Work | Earns $30, reduces energy by 20, hunger by 15 and happiness by 5. Takes 2 hours |
| Relax | Restores 20 happiness, reduces energy by 5 and takes 1 hour |

Each action has its own character animation.

### 4. Use Your Inventory

Collect and use items to improve your character's stats.

Available items:

| Item | Price | Effect |
|---|---:|---|
| Apple | $5 | Restores 20 hunger |
| Bread | $8 | Restores 35 hunger |
| Water | $3 | Restores 10 hunger |
| Phone | $100 | Restores 5 happiness |
| Candy | $2 | Restores 8 hunger and 5 happiness |

- Your inventory has a capacity of 10 items.
- Identical items are grouped together.
- Use items whenever your character needs them.

### 5. Experience Halloween Night

Halloween night begins at 6 PM in the game.

During Halloween:
- The environment changes to a dark theme.
- A CSS moon appears.
- Floating ghosts appear.
- Three houses become available.
- Visit each house once.
- Receive random candy or money rewards.
- Visit all three houses to earn a $50 bonus.

Your house visits reset when a new in-game day begins.

### 6. Random Life Events

Unexpected events can happen during gameplay.

Examples include:
- Helping a neighbour.
- Finding a wallet.
- Buying food from a vendor.
- Meeting a stray cat.
- Getting caught in unexpected rain.

Each event gives you choices. Your decisions can affect your money, hunger, energy and happiness.

Events have a 25% chance of triggering when a new in-game hour is checked.

## Character Animations

The character is created using HTML and CSS.

Animations include:
- Eating animation with food moving towards the character.
- Working animation.
- Relaxing animation.
- Sleeping animation.
- Floating sleep symbol.
- Floating Halloween ghosts.
- Animated event panel.

The game uses CSS shapes and animations instead of external character images.

## Game Systems

- Character creation.
- In-game clock with days and AM/PM display.
- Automatic needs reduction over time.
- Money and reward system.
- Four daily actions.
- Inventory and item usage.
- Inventory capacity limit.
- Halloween night event.
- Random life events.
- Player choices with consequences.
- Character animations.
- Low-stat warnings.

## Installation

You can run the game locally without installing additional software.

1. Download or clone this repository.
2. Extract the downloaded files if necessary.
3. Open the project folder.
4. Open `index.html` in a web browser.
5. Start playing.

### Run with Git

```bash
git clone https://github.com/fah67425/life-simulator/
```

Open the downloaded folder and launch `index.html`.

## Technologies Used

- HTML5
- CSS3
- JavaScript

No external game engine or external image assets are required.

## Project Structure

```text
life-simulator/
│
├── index.html
├── style.css
└── main.js
```

| File | Purpose |
|---|---|
| `index.html` | Game structure and interface |
| `style.css` | Design, character and animations |
| `main.js` | Game logic and systems |

## Future Improvements

Possible additions for future versions:

- More random life events.
- More inventory items.
- More locations to explore.
- Character customization.
- Jobs and career progression.
- More activities and interactions.

## Credits

Created as a Hack Club Terra project.

Built with HTML, CSS and JavaScript.
