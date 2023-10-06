const container = document.querySelector(".container"),
    musicImg = container.querySelector("img"),
    musicName = container.querySelector(".name"),
    musicArtist = container.querySelector(".artist"),
	Audio = document.querySelector("#main_audio"),
	prevBtn = container.querySelector("#prev"),
	nextBtn = container.querySelector("#next"),
	playBtn = container.querySelector("#play_pause"),
	playBtnIcon = container.querySelector("#play_pause span"),
	progressBar = container.querySelector(".progress_bar"),
	progressArea = container.querySelector(".progress_area");

let index = 1;

window.addEventListener("load", ()=>{
    loadData(index);
})

function loadData(indexValue){
    musicName.innerHTML = songs[indexValue - 1].name;
    musicImg.src = `images/${songs[indexValue - 1].img}.jpg`;
	musicArtist.innerHTML = songs[indexValue - 1].artist;
	Audio.src = `audio/${songs[indexValue - 1].audio}.mp3`;
}

playBtn.addEventListener("click", ()=>{
	const isMusicPaused = container.classList.contains("paused");
	if(isMusicPaused){
		pauseSong();
	} else {
		playSong();
	}
});

function playSong(){
	container.classList.add("paused");
	musicImg.classList.add('rotate');
	playBtnIcon.innerHTML = `<i class="fa-solid fa-pause"></i>`;
	Audio.play();
}

function pauseSong() {
	container.classList.remove("paused");
	musicImg.classList.remove('rotate');
	playBtnIcon.innerHTML = `<i class="fa-solid fa-play"></i>`;
	Audio.pause();
}	

nextBtn.addEventListener("click", ()=> {
	nextSong();
});

prevBtn.addEventListener("click", ()=>{
	prevSong();
})

function nextSong(){
	index++;
	if(index > songs.length){
		index = 1;
	} else {
		index = index;
	}
	loadData(index);
	playSong();
}

function prevSong(){
	index--;
	if(index <= 0){
		index = songs.length;
	} else {
		index = index;
	}
	loadData(index);
	playSong();
}

Audio.addEventListener("timeupdate", (event)=>{
	const initialTime = event.target.currentTime; 
	const finalTime = event.target.duration; 
	let barWidth = (initialTime / finalTime) * 100;
	progressBar.style.width = `${barWidth}%`;

	progressArea.addEventListener("click", (event)=>{
		let progressValue = progressArea.clientWidth; 
		let clickedOffsetX = event.offsetX; 
		let musicDuration = Audio.duration; 
	
		Audio.currentTime = (clickedOffsetX / progressValue) * musicDuration;
		
	});
	

	Audio.addEventListener("loadeddata", ()=>{
		let finalTimeData = container.querySelector(".max_duration");
	
		
		let AudioDuration = Audio.duration;
		let finalMinutes = Math.floor(AudioDuration / 60);
		let finalSeconds = Math.floor(AudioDuration % 60);
		if(finalSeconds < 10){
			finalSeconds = `0${finalSeconds}`;
		}
		finalTimeData.innerText = `${finalMinutes}:${finalSeconds}`;
	});


	let currentTimeData = container.querySelector(".current_time");
	let CurrentTime = Audio.currentTime;
	let currentMinutes = Math.floor(CurrentTime / 60);
	let currentSeconds = Math.floor(CurrentTime % 60);
	if(currentSeconds < 10){
		currentSeconds = `0${currentSeconds}`;
	}
	currentTimeData.innerText = `${currentMinutes}:${currentSeconds}`; 
});

Audio.addEventListener("ended", ()=>{
	index++;
	if(index > songs.length){
		index = 1;
	}
	loadData(index);
	playSong();
});