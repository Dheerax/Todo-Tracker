document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskbtn = document.getElementById('task-btn');
    const tasklist = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container'); // Corrected: Added . for class

    const toggleEmptyState = () => {
        emptyImage.style.display = tasklist.children.length === 0 ? 'block' : 'none';
        // Consider if this width change is desired for empty state
        todosContainer.style.width = tasklist.children.length > 0 ? '100%' : 'auto'; // Adjusted for potentially better layout
    }

    const numbers = document.getElementById('numbers');
    const progress = document.getElementById('progress');
    
    const updateProgress = () => {
        const totalTask = tasklist.children.length;
        const completedTasks = tasklist.querySelectorAll('.checkbox:checked').length;

        progress.style.width = totalTask ? `${(completedTasks / totalTask) * 100}%` : `0%`;
        numbers.textContent = `${completedTasks} / ${totalTask}`;

        if (totalTask > 0 && completedTasks === totalTask) {
            Confetti();
        }
    }
    
    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" class="checkbox"><span>${taskText}</span>
        <div class='task-btns'><button class='edit-btn'><i class="fa-solid fa-pen"></i></button><button class="trash-btn"><i class="fa-solid fa-trash"></i></button></div>`;

        // Get controls *within the current li*
        const currentCheckbox = li.querySelector('.checkbox');
        const currentEditBtn = li.querySelector('.edit-btn');
        const currentTrashBtn = li.querySelector('.trash-btn');
        const span = li.querySelector('span');

        currentEditBtn.addEventListener('click', () => {
            if (!currentCheckbox.checked) {
                taskInput.value = span.textContent; // Use span from current li
                li.remove(); // 'li' here correctly refers to the li of this task
                toggleEmptyState();
                updateProgress();
            }
        });

        currentTrashBtn.addEventListener('click', () => {
            li.remove(); // 'li' here correctly refers to the li of this task
            toggleEmptyState();
            updateProgress();
        });

        currentCheckbox.addEventListener('change', () => {
            if(currentCheckbox.checked){
                span.style.textDecoration = 'line-through';
                span.style.opacity = '0.7';
                currentEditBtn.disabled = true;
                currentEditBtn.classList.add('disabled');
                updateProgress();
            }
            else{
                span.style.textDecoration = 'none';
                span.style.opacity = '1';
                currentEditBtn.disabled = false;
                currentEditBtn.classList.remove('disabled');
                updateProgress();
            }
        })

        tasklist.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
        updateProgress();
    }

    taskbtn.addEventListener('click', addTask);
    toggleEmptyState(); // Call initially to set up the correct view
});

const Confetti = () => {
    const duration = 3000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}