var sharedContextmenuId=null;
function createSharedContextmenu() {
	if (!sharedContextmenuId) {
		sharedContextmenuId = chrome.contextMenus.create({
			title: '选取图片发布到boqpod.cn',
			contexts: ['all'],
			onclick: function(info, tab) {
				var text = info.selectionText;
				text = text || tab.title;
				var link = info.linkUrl || info.frameUrl || info.pageUrl;
				var image_rex = /\.(jpg|png|gif|bmp)$/ig;
				if (link.toLowerCase().indexOf('javascript') === 0 || link === info.srcUrl || image_rex.test(link)) {
					link = info.frameUrl || info.pageUrl;
				}
				chrome.tabs.sendRequest(tab.id, {
					method: 'showSendPhototoBlog',
					text: text,
					link: link,
					info: info
				});
			}
		});
	}
}

function removeSharedContextmenu(){
	if(sharedContextmenuId){chrome.contextMenus.remove(sharedContextmenuId);sharedContextmenuId=null;
	}
}
createSharedContextmenu();