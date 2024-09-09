document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const comicContainer = document.querySelector('.comic-container');
    const dialogueAnimation = document.getElementById('dialogue-animation');
    const voiceOver = document.getElementById('voice-over');
    const animationOverlay = document.getElementById('animation-overlay');
    const sceneAnimation = document.getElementById('scene-animation');
    let isDialoguePlaying = false;
    let dialogue1Played = false;
    let dialogue2Played = false;
    let dialogue3Played = false;

    // Invisible button references for panels
    const panel1Button = document.getElementById('panel1-button');
    const panel2Button = document.getElementById('panel2-button');

    // Handle start button
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        comicContainer.style.display = 'block';
    });

    // Scroll event listener for dialogues
    window.addEventListener('scroll', () => {
        if (!isDialoguePlaying) {
            let scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            manageDialogues(scrollPercent);
        }
    });

    // Function to manage dialogues based on scroll
    function manageDialogues(scrollPercent) {
        if (scrollPercent >= 15 && scrollPercent < 20 && !dialogue1Played) {
            dialogue1Played = true;
            triggerDialogue('animated pages/page1_2.gif', 'audio/inner_1.mp3', 'animated pages/page1_2.png');
        } else if (scrollPercent >= 60 && scrollPercent < 70 && !dialogue2Played) {
            dialogue2Played = true;
            triggerDialogue('animated pages/page1_3.gif', 'audio/inner_2.mp3', 'animated pages/page1_3.png');
        } else if (scrollPercent >= 97 && !dialogue3Played) {
            dialogue3Played = true;
            triggerDialogue('animated pages/page1_4.gif', 'audio/inner_3.mp3', 'animated pages/page1_4.png');
        } else if (scrollPercent < 10) {
            resetDialogues();
        }
    }

    // Trigger dialogue
    function triggerDialogue(gif, audio, png) {
        isDialoguePlaying = true;
        freezePage();
        dialogueAnimation.src = gif;
        dialogueAnimation.style.opacity = 1;
        voiceOver.src = audio;
        voiceOver.play();

        setTimeout(() => {
            dialogueAnimation.src = png;
            voiceOver.pause();
            voiceOver.currentTime = 0;
            unfreezePage();
            isDialoguePlaying = false;
        }, 6000);
    }

    // Reset dialogues
    function resetDialogues() {
        dialogueAnimation.style.opacity = 0;
        voiceOver.pause();
        voiceOver.currentTime = 0;
        isDialoguePlaying = false;
        dialogue1Played = false;
        dialogue2Played = false;
        dialogue3Played = false;
        unfreezePage();
    }

    // Freeze page scrolling
    function freezePage() {
        document.body.style.overflow = 'hidden';
    }

    // Unfreeze page scrolling
    function unfreezePage() {
        document.body.style.overflow = 'auto';
    }

    // Panel button click to trigger animation overlay
    panel1Button.addEventListener('click', () => {
        triggerAnimationOverlay('animated pages/scene1.gif');
    });

    panel2Button.addEventListener('click', () => {
        triggerAnimationOverlay('animated pages/scene2.gif');
    });

    // Function to trigger animation overlay
    function triggerAnimationOverlay(gif) {
        freezePage();  // Freeze page scrolling
        animationOverlay.style.display = 'flex';  // Show the overlay
        sceneAnimation.src = gif;  // Set the GIF source

        // Wait for GIF to play for 6 seconds (or the duration of the gif) before exiting
        setTimeout(() => {
            animationOverlay.style.display = 'none';  // Hide the overlay
            sceneAnimation.src = '';  // Clear the GIF
            unfreezePage();  // Unfreeze page scrolling
        }, 5000);  // Adjust based on GIF duration
    }
});
