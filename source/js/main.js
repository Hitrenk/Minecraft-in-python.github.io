function data2articleDetail(data) {
	url = "./article-tmp.html?" + data["name"];
	s = '<li>';
	s += '<a href="' + url + '">' + data["name"].slice(0, -5) + "</a></li>";
	return s;
}

function data2issuesDetail(data, repo) {
	url = "https://github.com/" + repo + "/issues/" + data["number"];
	s = '<li>';
	s+= '<a href="' + url + '">' + data["title"] + "(#" + data["number"] + ")</a>";
	s+= ' by <a href="' + data["user"]["html_url"] + '">' + data["user"]["login"] + "</a></li>";
	return s;
}

function setArticleList(id) {
	api = "https://api.github.com/repos/Minecraft-in-python/Minecraft/contents/article";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (file in data) {
				$(id).prepend(data2articleDetail(data));
			}
		} else {
			$(id).prepend("<li>Github api error!</li>");
		}
	});
}

function setIssuesList(repo, id) {
	api = "https://api.github.com/repos/" + repo + "/issues";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (issues of data) {
				$(id).prepend(data2issuesDetail(issues, repo));
			}
		} else {
			$(id).prepend("<li>Github api error!</li>");
		}
	});
}
