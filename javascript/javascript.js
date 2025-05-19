document.addEventListener('DOMContentLoaded', function() {
    const movieInput = document.getElementById('movie-input');
    const addButton = document.getElementById('add-button');
    const filmsList = document.getElementById('films');
    const achievementList = document.getElementById('achievement-list');
    
    filmsList.innerHTML = '';
    
    const achievements = {
        1: "Movie-starter: You watched your first movie!",
        5: "Movie-enthusiast: 5 movies, you got it rollin'!",
        10: "Movie-Maniac: You've watched 10 movies!",
        25: "Film-aholic: 25 movies watched!",
        50: "Movie-expert: 50 movies angesehen!",
        100: "Movie-Master: 100 movies have been watched!"
    };

    achievementList.innerHTML = '<li>No achievements unlocked yet</li>';
    
    addButton.addEventListener('click', addMovie);
    
    movieInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addMovie();
        }
    });
    
    function addMovie() {
        const movieTitle = movieInput.value.trim();
        
        if (movieTitle) {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'watched-checkbox';
            checkbox.addEventListener('change', function() {
                if (!this.checked) {
                    const starsContainer = this.parentElement.querySelector('.stars');
                    const stars = starsContainer.querySelectorAll('.star');
                    stars.forEach(star => {
                        star.textContent = '☆';
                        star.classList.remove('active');
                    });
                }
                updateAchievements();
            });
            
            const span = document.createElement('span');
            span.className = 'movie-title';
            span.textContent = movieTitle;
            
            const starsContainer = document.createElement('div');
            starsContainer.className = 'stars';
            
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('span');
                star.className = 'star';
                star.textContent = '☆';
                
                star.addEventListener('click', function() {
                    const stars = this.parentElement.querySelectorAll('.star');
                    const clickedIndex = Array.from(stars).indexOf(this);
                    
                    const checkbox = this.parentElement.parentElement.querySelector('.watched-checkbox');
                    checkbox.checked = true;
                    
                    stars.forEach((star, index) => {
                        if (index <= clickedIndex) {
                            star.textContent = '★';
                            star.classList.add('active');
                        } else {
                            star.textContent = '☆';
                            star.classList.remove('active');
                        }
                    });
                    
                    updateAchievements();
                });
                
                starsContainer.appendChild(star);
            }
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(starsContainer);
            
            filmsList.appendChild(li);
            
            movieInput.value = '';
        }
    }
    
    function updateAchievements() {
        const checkedCheckboxes = document.querySelectorAll('.watched-checkbox:checked').length;
        
        if (checkedCheckboxes > 0 && achievementList.innerHTML === '<li>No achievements unlocked yet</li>') {
            achievementList.innerHTML = '';
        }
        
        for (const count in achievements) {
            const achievementId = `achievement-${count}`;
            
            if (checkedCheckboxes >= parseInt(count)) {
                if (!document.getElementById(achievementId)) {
                    const achievementItem = document.createElement('li');
                    achievementItem.id = achievementId;
                    achievementItem.textContent = achievements[count];
                    achievementList.appendChild(achievementItem);
                }
            }
        }
        
        if (checkedCheckboxes === 0) {
            achievementList.innerHTML = '<li>No achievements unlocked yet</li>';
        }
    }
});