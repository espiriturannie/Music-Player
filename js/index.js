let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");


function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89199ed679msh8e8a552c15a480bp1f7d08jsn9f51cc0dcf12',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
    };

	fetch('https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=1001', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.lyrics.lyrics.body.html)
            document.querySelector("#lyrics").innerHTML = `
                <div>${response.lyrics.lyrics.body.html}</div>
            `
        })

     fetch('https://genius-song-lyrics1.p.rapidapi.com/album/details/?id=670828', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89199ed679msh8e8a552c15a480bp1f7d08jsn9f51cc0dcf12',
            'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
        })
            .then(response => response.json())
            .then(result => {
                document.querySelector("#album_image").src = result.album.song_performances[0].artists[0].image_url;                
                const textDiv = document.querySelector(".album_title");
                const title = document.createElement('P');
                const pContent = document.createTextNode(result.album.song_performances[0].artists[0].name);
                textDiv.appendChild(title)
                title.appendChild(pContent);

     })

     const url = 'https://genius-song-lyrics1.p.rapidapi.com/artist/details/?id=344497';
     const option = {
         method: 'GET',
         headers: {
             'X-RapidAPI-Key': '89199ed679msh8e8a552c15a480bp1f7d08jsn9f51cc0dcf12',
             'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
         }
     };
     
     fetch(url, option)
     .then(response => response.json())
     .then(data => {
        document.querySelector("#artist_img").src = data.artist.image_url; 
        const textDiv = document.querySelector(".artist_title");
        const title = document.createElement('P');
        const pContent = document.createTextNode(data.artist.name);
        textDiv.appendChild(title)
        title.appendChild(pContent);
     })
     

