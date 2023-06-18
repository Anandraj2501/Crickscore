let ham_burger = document.querySelector(".ham_burger");
let team1_name = document.querySelector(".team1_name");
let team1_runs = document.querySelector(".team1_runs");
let team1_wickets = document.querySelector(".team1_wickets");
let team2_name = document.querySelector(".team2_name");
let team2_runs = document.querySelector(".team2_runs");
let team2_wickets = document.querySelector(".team2_wickets");
let recent_match_wrapper = document.querySelector(".recent_match_wrapper");
let intl_schedule_wrapper = document.querySelector(".intl_schedule_wrapper");
let news_wrapper = document.querySelector(".news_wrapper");
let ipl_schedule_wrapper = document.querySelector(".ipl_schedule_wrapper");
let live_match_wrapper = document.querySelector(".live_match_wrapper");
let upcoming_match_wrapper = document.querySelector(".upcoming_match_wrapper");

let team1inngs2_runs = document.querySelector(".team1inngs2_runs");
let team1inngs2_wickets = document.querySelector(".team1inngs2_wickets");
let team2inngs2_runs = document.querySelector(".team2inngs2_runs");
let team2inngs2_wickets = document.querySelector(".team2inngs2_wickets");



ham_burger.addEventListener("click", () => {

    const overlay = document.querySelector(".overlay");
    if (overlay.classList.contains("hidden")) {
        overlay.classList.remove("hidden");
        overlay.classList.add("block");
    }
    else {
        overlay.classList.remove("block");
        overlay.classList.add("hidden");
    }
});

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': '1c2d267312mshe22538a8bf5ef4fp1fafa0jsncc537d39c2d8',
        'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
};
var upcomingmatches = {};
var livematch = {};
var matches = {};
var intl_schedule={};
var ipl_schedule ={};
var news= {};

async function getrecentscore(){
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",options);

    matches = await response.json();
    matches = matches.typeMatches;
    console.log(matches,"in");
    for (let i = 0; i < 4; i++) {
        var inngs2=false, team1_runs,team1_wickets,team1_overs,team2_runs,team2_wickets,team2_overs,team1inngs2_overs,team2inngs2_overs;
        var team1_name = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName;
        var team2_name = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team2.teamName;
        var match_status = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.status;
        var match_type = matches[i].matchType;
        var match_no = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.matchDesc;
        var unixtimestamp = matches[1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.startDate;
        var date = new Date(parseInt(unixtimestamp));
        console.log(date.toLocaleDateString("default"));
        console.log(date.toLocaleTimeString("default"));
        if(matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.stateTitle==="Abandon"){
            team1_runs=0;
            team1_wickets=0;
            team1_overs=0;

            team2_runs=0;
            team2_wickets=0;
            team2_overs=0;
        }
        else{
            team1_runs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.runs;
            
            team1_wickets = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.wickets;
            
            team1_overs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.overs;
            


            team2_runs  = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.runs;
            
            team2_wickets = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.wickets;
            
            team2_overs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.overs;
            
            if(matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.hasOwnProperty("inngs2") || matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.hasOwnProperty("inngs2")){
                inngs2=true;
                team1inngs2_runs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.runs;
                team1inngs2_wickets = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.wickets;
                team1inngs2_overs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.overs;

                team2inngs2_runs  = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.runs;
                team2inngs2_wickets = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.wickets;
                team2inngs2_overs = matches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.overs
            }
        }
        if(inngs2==false){
        let boxes = `<div class="score_card_container cursor-pointer inline-block border-0 rounded-xl bg-white  w-80 p-4 align-middle">
        <div class="score_card_wrapper  h-auto ">
        <div class="matchtype text-xs truncate text-gray-500">${match_type} match / ${match_no} / ${date.toLocaleDateString("default")}</div><hr>
        
            <div class="team1 font-sans mb-2">
                <span class="team1_name font-medium">${team1_name}</span>
                <div class="inline-block team1_score float-right font-medium"> <span class="team1_runs">${team1_runs}/</span><span class="team1_wickets">${team1_wickets}</span><span> (${team1_overs})</span> </div>
            </div>
            <div class="team2 font-sans mb-2">
                <span class="team2_name font-medium">${team2_name}</span>
                <div class="inline-block team2_score float-right font-medium"> <span class="team2_runs">${team2_runs}/</span><span class="team2_wickets">${team2_wickets}</span><span> (${team2_overs})</span> </div>
            </div><hr>
            <div class="winner text-blue-400">
                ${match_status}
            </div>
            
        </div>
    </div>`
    recent_match_wrapper.insertAdjacentHTML("beforeend",boxes);}
        // [1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName
    else{
        let boxes = `<div class="score_card_container cursor-pointer inline-block border-0 rounded-xl bg-white  w-80 p-4 align-middle">
            <div class="score_card_wrapper  h-auto ">
            <div class="matchtype text-xs truncate text-gray-500">${match_type} match / ${date.toLocaleDateString("default")}</div><hr>
            
                <div class="team1 font-sans mb-2">
                    <span class="team1_name font-medium">${team1_name}</span>
                    <div class="inline-block team1_score float-right font-medium"> <span class="team1_runs">${team1_runs}/</span><span class="team1_wickets">${team1_wickets}</span><span> (${team1_overs})</span> <span class="team1inngs2_runs">& ${team1inngs2_runs}/</span><span class="team1inngs2_wickets">${team1inngs2_wickets}</span><span> (${team1inngs2_overs})</span> </div>
                </div>
                <div class="team2 font-sans mb-2">
                    <span class="team2_name font-medium">${team2_name}</span>
                    <div class="inline-block team2_score float-right font-medium"> <span class="team2_runs">${team2_runs}/</span><span class="team2_wickets">${team2_wickets}</span><span> (${team2_overs})</span> <span class="team2inngs2_runs">& ${team2inngs2_runs}/</span><span class="team2inngs2_wickets">${team2inngs2_wickets}</span><span> (${team2inngs2_overs})</span></div>
                </div><hr>
                <div class="winner text-blue-400">
                    ${match_status}
                </div>
                
            </div>
        </div>`
        recent_match_wrapper.insertAdjacentHTML("beforeend",boxes);
    }
    }
};

async function getupcomingmatches(){
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",options);

    upcomingmatches = await response.json();
    upcomingmatches = upcomingmatches.typeMatches;
    console.log(upcomingmatches,"into");
    for (let i = 0; i < 4; i++) {
        var team1_runs,team1_wickets,team1_overs,team2_runs,team2_wickets,team2_overs;
        var team1_name = upcomingmatches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName;
        var team2_name = upcomingmatches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team2.teamName;
        var match_status = upcomingmatches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.status;
        var match_type = upcomingmatches[i].matchType;
        var series_name = upcomingmatches[i].seriesMatches[0].seriesAdWrapper.seriesName;
        var match_no = upcomingmatches[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.matchDesc;
        var unixtimestamp = upcomingmatches[1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.startDate;
        var date = new Date(parseInt(unixtimestamp));
        console.log(date.toLocaleDateString("default"));
        console.log(date.toLocaleTimeString("default"));
        
        let boxes = `<div class="score_card_container cursor-pointer inline-block border-0 rounded-xl bg-white  w-80 p-4 align-middle">
        <div class="score_card_wrapper  h-auto ">
        <div class="matchtype text-xs truncate text-gray-500">${match_type} match / ${match_no} / ${date.toLocaleDateString("default")}</div><hr>
        
            <div class="team1 font-sans mb-2">
                <span class="team1_name font-medium">${team1_name}</span>
            </div>
            <div class="team2 font-sans mb-2">
                <span class="team2_name font-medium">${team2_name}</span>
            </div><hr>
            <div class="winner text-blue-400">
                ${series_name}
            </div>
            
        </div>
    </div>`
    upcoming_match_wrapper.insertAdjacentHTML("beforeend",boxes);
        // [1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName
    }
};

async function populatedata() {
    await getrecentscore();

    //international schedule:
    const intl_schedule_response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international",options);
    intl_schedule = await intl_schedule_response.json();
    intl_schedule = intl_schedule.matchScheduleMap;
    console.log(intl_schedule);
    
    for(let i=0;i<intl_schedule.length;i++){
        if(intl_schedule[i].hasOwnProperty("scheduleAdWrapper")){
            for(var j=0;j<intl_schedule[i].scheduleAdWrapper.matchScheduleList.length;j++){
                // console.log(i,",",intl_schedule[i].scheduleAdWrapper.matchScheduleList[j].seriesName);
                
                let intl_schedule_box = `<div class="intl_schedule_boxes border cursor-pointer border-slate-300 mt-4 ">
                                            <div class="match_info mt-1 truncate text-xs text-gray-500">${intl_schedule[i].scheduleAdWrapper.matchScheduleList[j].seriesCategory}</div><hr>
                                            <div class="intl_team1_name truncate font-medium mt-2">${intl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].team1.teamName}</div>
                                            <div class="intl_team2_name truncate my-2 font-medium">${intl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].team2.teamName}</div><hr>
                                            <div class="match_info mt-1 truncate text-xs text-gray-500">${intl_schedule[i].scheduleAdWrapper.date} / ${intl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].matchDesc}</div>
                                        </div>`
                intl_schedule_wrapper.insertAdjacentHTML("beforeend",intl_schedule_box);
            }
        }
    }

    // News:

    const news_response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/news/v1/index",options);
    news = await news_response.json();
    news = news.storyList;
    console.log(news);
    console.log(news[0].story.coverImage.id);
    for(let i=0;i<6;i++){
        console.log(i);
        if(news[i].hasOwnProperty("story")){
            let image_id=news[i].story.imageId;
            const img_response=await fetch(`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${image_id}/i.jpg`,options);
    
            const news_box = `<div class="news_container cursor-pointer border border-slate-300 flex w-full h-auto p-2 mt-4 rounded-md">
                                <div class="img_container box-border w-1/4" >
                                
                                <img src="${img_response.url}" alt="#" class="w-full rounded-md h-auto max-w-sm"></img> 
                                </div>
                                
                                <div class="headline_container  ml-2  w-3/4">
                                    <p  style="font-size:2vw;">${news[i].story.hline}</p>
                                    <div class="font-sans font-normal text-base" style="font-size:1vw;">${news[i].story.intro}</div>
                                </div>
                            </div>`
                            news_wrapper.insertAdjacentHTML("beforeend",news_box);
        }
    }

    //ipl
    const ipl_schedule_response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/league",options);
    ipl_schedule = await ipl_schedule_response.json();
    ipl_schedule = ipl_schedule.matchScheduleMap;
    console.log(ipl_schedule);
    
    for(let i=0;i<ipl_schedule.length;i++){
        if(ipl_schedule[i].hasOwnProperty("scheduleAdWrapper")){
            for(var j=0;j<ipl_schedule[i].scheduleAdWrapper.matchScheduleList.length;j++){
                let ipl_schedule_box = `<div class="intl_schedule_boxes border cursor-pointer border-slate-300 mt-4 ">
                <div class="match_info mt-1 truncate text-xs text-gray-500">${ipl_schedule[i].scheduleAdWrapper.matchScheduleList[j].seriesCategory}</div><hr>
                <div class="intl_team1_name  truncate font-medium mt-2">${ipl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].team1.teamName}</div>
                <div class="intl_team2_name  truncate font-medium my-2">${ipl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].team2.teamName}</div><hr>
                <div class="match_info mt-1 truncate text-xs text-gray-500">${ipl_schedule[i].scheduleAdWrapper.date} / ${ipl_schedule[i].scheduleAdWrapper.matchScheduleList[j].matchInfo[0].matchDesc}</div>
                </div>`
                ipl_schedule_wrapper.insertAdjacentHTML("beforeend",ipl_schedule_box);
            }
        }
    }
};

async function getlivematches(){
    const response = await fetch("https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",options);

    livematch = await response.json();
    livematch = livematch.typeMatches;
    console.log(livematch,"live");
    for (let i = 0; i < livematch.length; i++) {
        var inngs2 = false,team1_runs,team1_wickets,team1_overs,team2_runs,team2_wickets,team2_overs,team1inngs2_overs,team2inngs2_overs;
        var team1_name = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName;
        var team2_name = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team2.teamName;
        var match_status = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.status;
        var match_type = livematch[i].matchType;
        // var match_no = livematch[i].typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.matchDesc;
        var unixtimestamp = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.startDate;
        var date = new Date(parseInt(unixtimestamp));
        console.log(date.toLocaleDateString("default"));
        console.log(date.toLocaleTimeString("default"));
        if(livematch.length == 0){
            live_match_wrapper.innerHTML ="No live match to show come back after some time";
        }
        else{
            if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].hasOwnProperty("matchScore")){
                console.log("true");
                if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.length != 0){
                    // team1_runs = 0;
                    // team1_wickets = 0;
                    // team1_overs = 0;

                    team1_runs  = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.runs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.hasOwnProperty("wickets")){
                        team1_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.wickets;
                    }
                    else{
                        team1_wickets = 0;
                    }
                    team1_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.overs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.hasOwnProperty("inngs2")){
                        inngs2 = true;
                        team1inngs2_runs  = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.runs;
                        team1inngs2_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.overs;
                        if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.hasOwnProperty("wickets")){
                            team1inngs2_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.wickets;
                        }
                        else{
                            team1inngs2_wickets = 0;
                        }
                    }
                }
                if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.length != 0){
                    // team1_runs = 0;
                    // team1_wickets = 0;
                    // team1_overs = 0;

                    team2_runs  = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.runs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.hasOwnProperty("wickets")){
                        team2_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.wickets;
                    }
                    else{
                        team2_wickets = 0;
                    }
                    team2_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.overs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.hasOwnProperty("inngs2")){
                        inngs2 = true;
                        team2inngs2_runs  = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.runs;
                        team2inngs2_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.overs;
                        if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.hasOwnProperty("wickets")){
                            team2inngs2_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs2.wickets;
                        }
                        else{
                            team2inngs2_wickets = 0;
                        }
                    }
                }
                if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team2Score.inngs1.length == 0){
                    team1_runs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.runs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.hasOwnProperty("wickets")){
                        team1_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.wickets;
                    }
                    else{
                        team1_wickets =0;
                    }
                    team1_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.overs;
                    if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.hasOwnProperty("inngs2")){
                        inngs2 = true;
                        team1inngs2_runs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.runs;
                        if(livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.hasOwnProperty("wickets")){
                            team1inngs2_wickets = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs2.wickets;
                        }
                        else{
                            team1inngs2_wickets =0;
                        }
                        team1inngs2_overs = livematch[i].seriesMatches[0].seriesAdWrapper.matches[0].matchScore.team1Score.inngs1.overs;
                    }

                    team2_runs=0; 
                    team2_wickets=0;
                    team2_overs=0;
                }
            }
            else{
                team1_runs=0;
                team1_wickets=0;
                team1_overs=0;

                team2_overs=0;
                team2_runs=0;
                team2_wickets=0;
            }
        }
        if(inngs2 == false){
            let boxes = `<div class="score_card_container cursor-pointer inline-block border-0 rounded-xl bg-white  w-80 p-4 align-middle">
            <div class="score_card_wrapper  h-auto ">
            <div class="matchtype text-xs truncate text-gray-500">${match_type} match / ${date.toLocaleDateString("default")}</div><hr>
            
                <div class="team1 font-sans mb-2">
                    <span class="team1_name font-medium">${team1_name}</span>
                    <div class="inline-block team1_score float-right font-medium"> <span class="team1_runs">${team1_runs}/</span><span class="team1_wickets">${team1_wickets}</span><span> (${team1_overs})</span> </div>
                </div>
                <div class="team2 font-sans mb-2">
                    <span class="team2_name font-medium">${team2_name}</span>
                    <div class="inline-block team2_score float-right font-medium"> <span class="team2_runs">${team2_runs}/</span><span class="team2_wickets">${team2_wickets}</span><span> (${team2_overs})</span> </div>
                </div><hr>
                <div class="winner text-blue-400">
                    ${match_status}
                </div>
                
            </div>
        </div>`
                live_match_wrapper.insertAdjacentHTML("beforeend",boxes);
                    // [1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName
                
            
        }
        else{
            let boxes = `<div class="score_card_container cursor-pointer inline-block border-0 rounded-xl bg-white  w-80 p-4 align-middle">
            <div class="score_card_wrapper  h-auto ">
            <div class="matchtype text-xs truncate text-gray-500">${match_type} match / ${date.toLocaleDateString("default")}</div><hr>
            
                <div class="team1 font-sans mb-2">
                    <span class="team1_name font-medium">${team1_name}</span>
                    <div class="inline-block team1_score float-right font-medium"> <span class="team1_runs">${team1_runs}/</span><span class="team1_wickets">${team1_wickets}</span><span> (${team1_overs})</span> <span class="team1inngs2_runs">& ${team1inngs2_runs}/</span><span class="team1inngs2_wickets">${team1inngs2_wickets}</span><span> (${team1inngs2_overs})</span> </div>
                </div>
                <div class="team2 font-sans mb-2">
                    <span class="team2_name font-medium">${team2_name}</span>
                    <div class="inline-block team2_score float-right font-medium"> <span class="team2_runs">${team2_runs}/</span><span class="team2_wickets">${team2_wickets}</span><span> (${team2_overs})</span> <span class="team2inngs2_runs">& ${team2inngs2_runs}/</span><span class="team2inngs2_wickets">${team2inngs2_wickets}</span><span> (${team2inngs2_overs})</span></div>
                </div><hr>
                <div class="winner text-blue-400">
                    ${match_status}
                </div>
                
            </div>
        </div>`
                live_match_wrapper.insertAdjacentHTML("beforeend",boxes);
                    // [1].seriesMatches[0].seriesAdWrapper.matches[0].matchInfo.team1.teamName
                }
            };
        }

async function showscore(){
    await getlivematches();
    await getupcomingmatches();
    await getrecentscore();
    
}