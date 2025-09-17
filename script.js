// DSA Problems will be loaded from questions.json
let dsaProblems = {};

// Function to load questions from JSON file
async function loadQuestionsData() {
    try {
        const response = await fetch('./questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        dsaProblems = data;
        console.log('Questions loaded successfully');
    } catch (error) {
        console.error('Error loading questions:', error);
        // Fallback to empty data if file can't be loaded
        dsaProblems = { arrays: [], strings: [], graphs: [] };
    }
}

// Current active section
let currentSection = 'arrays';
let allProblems = [];
let filteredProblems = [];

// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.topic-section');
const searchInput = document.getElementById('searchInput');

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    // Load questions first
    await loadQuestionsData();
    
    setupNavigation();
    setupSearch();
    loadProblems('arrays');
});

// Navigation functionality
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            switchSection(targetSection);
        });
    });
}

function switchSection(sectionName) {
    // Update navigation
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[href="#${sectionName}"]`).classList.add('active');
    
    // Update sections
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName).classList.add('active');
    
    // Load problems for the section
    currentSection = sectionName;
    loadProblems(sectionName);
    
    // Clear search
    searchInput.value = '';
}

// Search functionality
function setupSearch() {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filteredProblems = [...allProblems];
        } else {
            filteredProblems = allProblems.filter(problem => 
                problem.title.toLowerCase().includes(searchTerm) ||
                problem.description.toLowerCase().includes(searchTerm) ||
                problem.type.toLowerCase().includes(searchTerm)
            );
        }
        
        renderProblems(filteredProblems);
    });
}

// Load problems for a section
function loadProblems(sectionName) {
    const container = document.getElementById(`${sectionName}Problems`);
    
    // Show loading state
    container.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        allProblems = dsaProblems[sectionName] || [];
        filteredProblems = [...allProblems];
        renderProblems(filteredProblems);
    }, 300);
}

// Render problems in the container
function renderProblems(problems) {
    const container = document.getElementById(`${currentSection}Problems`);
    
    if (problems.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #6b7280;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>No problems found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = problems.map(problem => createProblemCard(problem)).join('');
    
    // Add click handlers to problem cards
    container.querySelectorAll('.problem-card').forEach(card => {
        card.addEventListener('click', function() {
            const link = this.querySelector('.problem-link');
            if (link) {
                window.open(link.href, '_blank');
            }
        });
    });
}

// Create individual problem card HTML
function createProblemCard(problem) {
    return `
        <div class="problem-card" data-id="${problem.id}">
            <div class="problem-header">
                <div>
                    <h3 class="problem-title">${problem.title}</h3>
                </div>
                <span class="difficulty-badge difficulty-${problem.difficulty}">
                    ${problem.difficulty}
                </span>
            </div>
            
            <p class="problem-description">${problem.description}</p>
            
            <div class="problem-footer">
                <span class="problem-type">${problem.type}</span>
                <a href="${problem.link}" class="problem-link" target="_blank" onclick="event.stopPropagation()">
                    Solve Problem <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        </div>
    `;
}

// Utility function to add new problems (for easy expansion)
function addProblem(section, problemData) {
    if (!dsaProblems[section]) {
        dsaProblems[section] = [];
    }
    
    const newId = Math.max(...Object.values(dsaProblems).flat().map(p => p.id)) + 1;
    problemData.id = newId;
    
    dsaProblems[section].push(problemData);
    
    // Refresh current section if it matches
    if (currentSection === section) {
        loadProblems(section);
    }
}

// Utility function to update problem links
function updateProblemLink(problemId, newLink) {
    for (const section in dsaProblems) {
        const problem = dsaProblems[section].find(p => p.id === problemId);
        if (problem) {
            problem.link = newLink;
            // Refresh current section if it contains this problem
            if (currentSection === section) {
                loadProblems(section);
            }
            break;
        }
    }
}

// Add smooth scroll behavior for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
    }
});

// Export for potential external use
window.DSAPractice = {
    addProblem,
    updateProblemLink,
    switchSection,
    dsaProblems
};