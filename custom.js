function Youtube(){
   this.init(); 
   this.bindingEvent();
}
Youtube.prototype.init = function(){
    this.selector = ".vidGallery";
    this.playlist = "PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd";
    this.key = "AIzaSyCbARLbftvbPSX5cjABTy1LZpet3RVkrh4";
    this.num = 4;
}
Youtube.prototype.bindingEvent = function(){
    //처음 로딩시 유튜브 데이터 출력
    this.getYoutube({
        frame: this.selector,
        playlist: this.playlist,
        num : this.num
    });

    //동적인 리스트의 썸네일 클릭시 팝업호출
    $("body").on("click", this.selector+" article a", function(e){
        e.preventDefault(); 
        this.createPop(e.currentTarget);
    }.bind(this));

    //동적인 리스트의 제목 클릭시 팝업호출
    $("body").on("click", this.selector+" article h2", function(e){
        this.createPop(e.currentTarget);
    }.bind(this));

    //팝업의 닫기버튼 클릭시 팝업닫기
    $("body").on("click", ".pop span", function(){
        $(".pop").remove(); 
    });
}
Youtube.prototype.getYoutube = function(opt){
    if(opt.frame===undefined) console.error("frame속성값은 필수 입력사항입니다.");
    if(opt.playlist===undefined) opt.playlist = "PLYOPkdUKSFgWPLsAWpqRpK0cCiAGdxi-Y";
    if(opt.num===undefined) opt.num = 2;

    $.ajax({
        url:"https://www.googleapis.com/youtube/v3/playlistItems",
        dataType : 'jsonp',
        data :{
            part : "snippet", 
            key : this.key, 
            maxResults : opt.num, 
            playlistId : opt.playlist
        }
    })
    .success(function(data){   
        let items = data.items;         
    
        //영상 갯수만큼 반복
        $(items).each(function(_, data){
            //본문 텍스트 내용이 200글자를 넘어가면 말줄임표 붙이기 
            let txt = data.snippet.description; 
            let len = txt.length; 
            if(len>200){
                txt = txt.substr(0, 200) + "..."
            } 
    
            //날짜 텍스트 정리 
            let date = data.snippet.publishedAt; 
            date = date.split("T")[0]; 
            //console.log(date);  
    
            $(opt.frame)
                .append(
                    $("<article>")
                        .append(
                            $("<a>").attr({ href : data.snippet.resourceId.videoId })
                                    .append(
                                        $("<img>").attr({ src : data.snippet.thumbnails.high.url })
                                    ),
                            $("<div class='con'>")
                                    .append(
                                        $("<h2>")
                                            .text(data.snippet.title)
                                            .attr({href : data.snippet.resourceId.videoId })
                                        ,
                                        $("<p>").text(txt),
                                        $("<span>").text(date)
                                    )
                        )
                )
        });
    })
    .error(function(err){
        console.error(err); 
    });
}
Youtube.prototype.createPop = function(item){
    let vidId = $(item).attr("href"); 

    $("body")
        .append(
            $("<div class='pop'>")
                .append(
                    $("<iframe>")
                        .attr({
                            src : "https://www.youtube.com/embed/"+vidId,
                            frameborder : 0   ,
                            allowfullscreen : true                         
                        }), 
                    $("<span>").text("close")
                )
        )
}






