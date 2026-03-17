const feedbackSelector = document.getElementById('feedback-selector');
const teacherContainer = document.getElementById('teacher-container');

const form = document.querySelector('form');

function resetForm() {
    form.reset();
    hideTeacherContainer();
}

feedbackSelector.addEventListener('change', function () {
    if (this.value == "teacher") {
        showTeacherContainer();
        return;
    }

    hideTeacherContainer();
});

function showTeacherContainer() {
    teacherContainer.classList.remove('hidden');
}

function hideTeacherContainer() {
    teacherContainer.classList.add('hidden');
}

// Add validation forms must not be empty to submit
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (validateForm() === false) {
        return;
    }

    submitFeedback(feedback, teacher);
});

function validateForm() {
    const feedback = document.getElementById('feedback-textarea').value;
    const teacher = document.getElementById('teacher').value;

    if (feedbackSelector.value === 'teacher' && (teacher === '' || !teacher)) {
        alert('Please provide the teacher\'s name before submitting.');
        return false;
    }

    if (feedback === '' || !feedback) {
        alert('Please provide your feedback before submitting.');
        return false;
    }

    return true;
}

async function submitFeedback(feedback, teacher) {
    const response = await fetch('https://uni-feedack.free.beeceptor.com/submit-feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: feedback,
            teacher: teacher
        })
    })

    if (response.ok) {
        alert('Thank you for your feedback!');
        resetForm();
    } else {
        alert('There was an error submitting your feedback. Please try again later.');
    }
}