function data2issues(data, repo) {
	url = "https://github.com/" + repo + "/issues/";
	s = '<li>';
	s+= '<a href="' + url + data["number"] + '">' + data["title"] + "</a>";
	s+= " by " + data["user"]["login"] + "</li>";
	return s;
}
