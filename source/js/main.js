function data2detail(data, repo) {
	url = "https://github.com/" + repo + "/issues/";
	s = '<li>';
	s+= '<a href="' + url + data["number"] + '">' + data["title"] + "</a>";
	s+= " #" + data["number"] + " by " + data["user"]["login"] + "</li>";
	return s;
}

function setIssuesList(repo, id) {
	api = "https://api.github.com/repos/" + repo + "/issues";
	$.get(api, function(data, status) {
		if (status == "success") {
			for (issues of data) {
				$(id).prepend(data2detail(issues, repo));
			}
		} else {
			$(id).prepend("<li>Github api error!</li>");
		}
	});
}
