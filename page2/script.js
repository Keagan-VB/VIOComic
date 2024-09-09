document.addEventListener('DOMContentLoaded', () => {
    const comicContainer = document.querySelector('.comic-container');
    const dialogueAnimation = document.getElementById('dialogue-animation');
    const voiceOver = document.getElementById('voice-over');
    const animationOverlay = document.getElementById('animation-overlay');
    const sceneAnimation = document.getElementById('scene-animation');
    let isDialoguePlaying = false;
    let dialogue1Played = false;

    // Invisible button references for panels
    const panel1Button = document.getElementById('panel1-button');
    const panel2Button = document.getElementById('panel2-button');
    const panel3Button = document.getElementById('panel3-button');

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
            triggerDialogue('../animated pages/page2_2.gif', '../audio/inner_4.mp3', '../animated pages/page2_2.png');
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
        triggerAnimationOverlay('../animated pages/scene3.gif');
    });

    panel2Button.addEventListener('click', () => {
        triggerAnimationOverlay('../animated pages/scene4.gif');
    });

    panel3Button.addEventListener('click', () => {
        triggerAnimationOverlay('../animated pages/scene5.gif');
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
