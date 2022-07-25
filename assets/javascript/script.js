const site   = new Site();
const client = new Client();

window.onload   = function() { site.load();   }
window.onscroll = function() { site.scroll(); }
window.onclick  = function(event) { site.click(event);  }