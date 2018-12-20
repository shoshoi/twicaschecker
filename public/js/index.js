$(document).ready(function(){
  var statusload = function(){
    console.log("load");
    $.ajax({
      type: 'GET',
      url: './json',
      dataType: 'json',
      success: function(json){
        for(var caster in json){
          var item = json[caster];

          var caslink = $("<a></a>", {
            href: "http://twitcasting.tv/" + caster,
            target: "_blank",
            text: caster
          });

          if(item["islive"]){
            $("#" + caster).addClass("success");
            $(".caster", "#" + caster).html($("<strong></strong>").html(caslink));
            $(".islive", "#" + caster).html($("<strong></strong>").text("放送中"));
          }else{
            $("#" + caster).removeClass("success");
            $(".caster", "#" + caster).html(caslink);
            $(".islive", "#" + caster).text("放送終了");
          }
          $(".viewers", "#" + caster).text(item["viewers"]);
          $(".total", "#" + caster).text(item["total"]);
          $(".duration", "#" + caster).text(setTime(item["duration"]));
          $(".title", "#" + caster).text(item["title"] + " " + item["subtitle"] + " " + item["hashtag"] + " ");
          if(item["moveid"] != false){
            var anker = $("<a></a>", {
              href: "http://twitcasting.tv/ruu_noji/movie/" + item["movieid"],
              target: "_blank",
              text: item["movieid"]
            });
            console.log(item["movieid"]);
            $(".movieid", "#" + caster).html(anker);
          }
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown)  {
        console.log("err");
      }
    });
  }
  statusload();
  setInterval(statusload, 15000);
  var setTime = function(tm){
    var t=tm;
    if((t/36000|0) > 0) var h=""+(t/36000|0)+(t/3600%10|0);
    if((t/36000|0) == 0) var h=""+(t/3600%10|0);
    var m=""+(t%3600/600|0)+(t%3600/60%10|0);
    var s=""+(t%60/10|0)+(t%60%10);
    if(h > 0){
      return h+"時間"+m+"分"+s+"秒";
    }else{
      return m+"分"+s+"秒";
    }
  }
});