{% if page.comments and theme.gitalk.enable %}
	<link rel="stylesheet" href="https://unpkg.com/gitalk/dist/gitalk.css">
	<script src="https://unpkg.com/gitalk/dist/gitalk.min.js"></script>
	<script src="https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js"></script>
	<script type="text/javascript">
    		var gitalk = new Gitalk({
		        clientID: '{{ theme.gitalk.client_id }}',
		        clientSecret: '{{ theme.gitalk.client_secret }}',
		        id: md5(location.pathname),
		        repo: '{{ theme.gitalk.repo }}',
		        owner: '{{ theme.gitalk.owner }}',
		        admin: '{{ theme.gitalk.admin_user }}',
			distractionFreeMode: '{{ theme.gitalk.distractionFreeMode }}',

		    });
	    gitalk.render('gitalk-container');
	</script>
{% endif %}
