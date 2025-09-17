# DSA Practice Website

A modern, responsive website for practicing Data Structures and Algorithms problems, featuring **ShadCN UI design** and the complete **Blind 75** question set.

## 🎨 Design Features

- **ShadCN UI Design System**: Modern, professional interface with HSL color tokens
- **Dark Mode Support**: Built-in light/dark theme compatibility
- **Smooth Animations**: Fade-in effects, hover animations, and floating backgrounds
- **Glassmorphism Effects**: Backdrop blur and translucent elements
- **Responsive Design**: Mobile-first approach with perfect scaling

## 📚 Question Database

- **75 Problems**: Complete set of essential coding interview questions
- **Difficulty Levels**: Easy, Medium, Hard with color-coded badges
- **Algorithm Types**: Hash Table, Two Pointers, Sliding Window, DP, BFS/DFS, etc.
- **Direct LeetCode Links**: One-click access to practice problems

## File Structure

```
DSA_Practices/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality (no questions data)
├── questions.json      # Separate questions database
└── README.md           # This file
```

## Key Features

- **ShadCN UI Design System**: Professional, modern interface with semantic color tokens
- **Blind 75 Questions**: Complete collection of essential coding interview problems
- **Animated Header**: Beautiful hero section with floating animations and feature cards
- **Separated Data Architecture**: Questions stored in `questions.json` for better organization
- **Clean Code Structure**: Script file contains only functionality, no embedded data
- **Advanced Search**: Real-time search across all problems with instant filtering
- **Responsive Navigation**: Tabbed interface with smooth transitions
- **Glassmorphism Design**: Modern UI with backdrop blur effects
- **Accessibility First**: Proper focus states, keyboard navigation, and screen reader support

## Getting Started

1. Open `index.html` in any modern web browser
2. Or run a local server: `python -m http.server 8000` and visit `http://localhost:8000`
3. Navigate between Arrays, Strings, and Graphs sections
4. Use search to find specific problems
5. Click any problem card to open the LeetCode link

## Adding New Questions

Edit the `questions.json` file to add new problems:

```json
{
  "arrays": [
    {
      "id": 38,
      "title": "Your New Problem",
      "description": "Problem description here...",
      "type": "Algorithm Type",
      "difficulty": "medium",
      "link": "https://leetcode.com/problems/your-problem/"
    }
  ]
}
```

## Blind 75 Question Categories

### 🔢 Arrays (17 problems)
- Two Sum, 3Sum, Container With Most Water
- Best Time to Buy/Sell Stock, Maximum Subarray
- Search/Find Min in Rotated Sorted Array
- Merge Intervals, Insert Interval, Non-overlapping Intervals
- Matrix problems: Rotate Image, Spiral Matrix, Set Matrix Zeroes

### 🔤 Strings (10 problems)  
- Valid Anagram, Valid Parentheses, Valid Palindrome
- Longest Substring Without Repeating Characters
- Minimum Window Substring, Group Anagrams
- Sliding Window patterns and string manipulation

### 🌐 Graphs (10 problems)
- Number of Islands, Clone Graph
- Course Schedule I & II (Topological Sort)
- Pacific Atlantic Water Flow
- Graph Valid Tree, Connected Components
- BFS/DFS traversal patterns

## Dynamic Problem Management

You can also add problems programmatically:

```javascript
// Add a new problem to arrays section
DSAPractice.addProblem('arrays', {
    title: "New Array Problem",
    description: "Description of the problem...",
    type: "Two Pointers",
    difficulty: "easy",
    link: "https://leetcode.com/problems/new-problem/"
});

// Update a problem's link
DSAPractice.updateProblemLink(problemId, "https://new-link.com");
```

## Benefits of Separated Architecture

- **Better Organization**: Questions data separated from logic
- **Easy Maintenance**: Edit questions without touching code
- **Scalability**: Can easily add hundreds of problems
- **Version Control**: Track changes to questions separately
- **Collaboration**: Multiple people can edit questions safely

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Design System**: ShadCN UI with HSL color tokens
- **Typography**: Inter font family with optimized font features
- **Icons**: Font Awesome 6.0
- **Architecture**: JSON-based data storage
- **Animations**: CSS keyframes with hardware acceleration
- **Responsive**: Mobile-first design with CSS Grid and Flexbox

## Browser Support

- Chrome, Firefox, Safari, Edge
- Mobile browsers supported
