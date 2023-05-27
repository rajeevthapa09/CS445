window.onload = function () {
    document.getElementById('loginBtn').onclick = login;
    if (sessionStorage.getItem('my-token')) {
        console.log("reloaded page")
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('my-playlist').style.display = 'block';
        document.getElementById('musicPlay').style.display = 'block';
        document.getElementById('welcome').innerText = `Welcome, ${sessionStorage.getItem('username')}`;
        fetchSongs();
    }
}

async function login() {
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            "username": document.getElementById('username').value,
            "password": document.getElementById('password').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    if (result.status) {
        document.getElementById('err').innerText = result.message;
    } else {
        //save token to session storage
        //hide login form
        //display logout button
        //pull song you may interested
        //pull playlist of the current user
        console.log(result);
        sessionStorage.setItem('my-token', result.accessToken);
        sessionStorage.setItem('username', result.username);
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('my-playlist').style.display = 'block';
        document.getElementById('musicPlay').style.display = 'block';
        document.getElementById('welcome').innerText = `Welcome, ${result.username}`;
        fetchSongs();
    }
}

async function fetchSongs() {
    const response = await fetch('http://localhost:3000/api/music', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`
        }
    });
    const songs = await response.json();
    console.log(songs);
    let html = `
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Release Date</th>
                <th>Action</th>
            </tr>
        `;
    let id = 1;
    songs.forEach((song, index) => {
        html += `
        <tr>
            <td id=${song.id}>${index + 1}</td>
            <td url=${song.urlPath}>${song.title}</td>
            <td>${song.releaseDate}</td>
            <td onclick="addToPlayList(this)">+</td>
        </tr>
        `;
        document.getElementById('songs').innerHTML = html;
    })

    fetchPlaylist();
}

let id = 1;
let playList = [];
async function addToPlayList(rx) {
    document.getElementById("mySongs").innerHTML = "";
    let html = `
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Action</th>
            </tr>
        `;
    document.getElementById('mySongs').innerHTML = html;

    const response = await fetch('http://localhost:3000/api/playlist/add', {
        method: 'POST',
        body: JSON.stringify({
            "songId": rx.parentNode.cells[0].getAttribute('id')
        }),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log("adding to playlist")
    console.log(result);
    playList = [];
    result.forEach((song, index) => {
        playList.push(song.urlPath);
        html = `
    <tr>
      <td>${index + 1}</td>
      <td >${song.title}</td>
      <td><span id="removeSong" songid=${song.songId} onclick="removeSong(this)"><img height="30px" width="30px" src="./image/remove.png" /></span><span id="playSong"><img onclick="playAudio('${song.urlPath}', '${song.title}', '${index}')" height="30px" width="30px" src="./image/play.png" /></span></td>
    </tr>
`;
        document.getElementById('mySongs').innerHTML += html;
    })

}

async function fetchPlaylist() {

    const response = await fetch('http://localhost:3000/api/playlist', {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`
        }
    });
    const songs = await response.json();
    console.log(songs);
    let html2 = `
    <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Action</th>
    </tr>`;
    document.getElementById('mySongs').innerHTML = html2;

    let html;
    playList = [];

    if (songs) {
        let id = 1;
        songs.forEach((song, index) => {
            playList.push(song.urlPath);
            let html = `
        <tr>
          <td>${index + 1}</td>
          <td >${song.title}</td>
          <td><span id="removeSong" songid=${song.songId} onclick="removeSong(this)"><img height="30px" width="30px" src="./image/remove.png" /></span><span id="playSong"><img onclick="playAudio('${song.urlPath}', '${song.title}', '${index}')" height="30px" width="30px" src="./image/play.png" /></span></td>
        </tr>
    `;
            document.getElementById('mySongs').innerHTML += html;
        })
    }
}

async function removeSong(rx) {
    console.log("rx", rx.getAttribute("songid"));

    const response = await fetch('http://localhost:3000/api/playlist/remove', {
        method: 'POST',
        body: JSON.stringify({
            "songId": rx.getAttribute("songid")
        }),
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`,
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    console.log("deleting from playlist")
    console.log(result);
    document.getElementById("mySongs").innerHTML = "";
    fetchPlaylist();

}
let current = 0;
async function playAudio(url, title, index) {
    current = index;
    console.log("current", current);
    console.log(url);
    let locationString = "http://127.0.0.1:3001/Project/music-server/src/" + url;

    let audioDiv = document.getElementById("audio");
    audioDiv.innerHTML = "";
    let span = document.getElementById("titleText");

    span.innerHTML = title + "...";
    let audio = document.createElement("audio");
    audio.style = "width:100%";
    audio.setAttribute("controls", "");
    audio.setAttribute("id", "audioPlayer");
    audio.setAttribute("preload", "none");
    audio.innerHTML = `<source src="${locationString}" type="audio/mp3">`;
    // audio.onended = function () {
    //     playNext();
    // };
    audioDiv.append(audio);
    audio.play();
}

function logout() {
    sessionStorage.removeItem("my-token");
    location.href = "index.html";
}

function searchItem() {
    let searchValue = document.getElementById("searchPlaceHolder").value;
    musicList(searchValue);
}

async function musicList() {

    let searchText = document.getElementById("searchPlaceHolder").value;

    //let playDiv = document.getElementById("musicPLay");
    let url = "http://localhost:3000/api/music";

    if (searchText) {
        url += `?search=${searchText}`;
    }

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('my-token')}`
        }
    });
    const songs = await response.json();
    console.log(songs);
    let html = `
            <tr>
                <th>id</th>
                <th>title</th>
                <th>releaseDate</th>
                <th>Action</th>
            </tr>
        `;
    let id = 1;
    songs.forEach(song => {
        html += `
        <tr>
            <td id=${song.id}>${id++}</td>
            <td url=${song.urlPath}>${song.title}</td>
            <td>${song.releaseDate}</td>
            <td onclick="addToPlayList(this)">+</td>
        </tr>
        `;
        document.getElementById('songs').innerHTML = html;
    })
}



function playNext() {
    console.log("playNext");
    current++;
    console.log("playlist", playList)
    if (current < playList.length) {
        playAudio(playList[current], "", current);
    } else {
        current = 0;
        playAudio(playList[current], "", current);
    }
}

function playPrevious() {
    console.log("playPrevious");
    current--;
    console.log("playlist", playList)
    if (current >= 0) {
        playAudio(playList[current], "", current);
    } else {
        current = playList.length - 1;
        playAudio(playList[current], "", current);
    }
}

let repeat = 0;
function playRepeat() {


    let aud = document.querySelector("#audioPlayer");
    if (repeat == 0) {
        document.getElementById("repeat").style.border = "4px blue solid";
        aud.setAttribute("loop", "");
        repeat = 1;
    } else if (repeat == 1) {
        document.getElementById("repeat").style.border = "";
        aud.removeAttribute("loop");
        repeat = 0;
    }
}
let check = 0;
let shuffler = "start";
function playShuffle() {

    let random;
    let audio;
    if (shuffler === "start") {
        document.getElementById("shuffle").style.border = "4px blue solid";
        random = getRndInteger(playList.length);
        if (check === random) {
            playShuffle();
            check = random;
        }

        audio = document.getElementById("audioPlayer");
        audio.onended = function () {
            playAudio(playList[random], "", random);
        }
        shuffler = "end";
    }else{
        document.getElementById("shuffle").style.border = "";
        audio = document.getElementById("audioPlayer");
        audio.onended = ""
        shuffler = "start";
    }

}

let oneByone = true;
function playOneByOne(){

    if(oneByone === true){
        document.getElementById("oneByone").style.border = "4px blue solid";
        audio = document.getElementById("audioPlayer");
        audio.onended = function () {
            playNext();
        }
        oneByone = false;
    }else{
        document.getElementById("oneByone").style.border = "";
        audio = document.getElementById("audioPlayer");
        audio.onended = "";
        oneByone = true;
    }

}

function getRndInteger(max) {
    return Math.floor(Math.random() * max);
}