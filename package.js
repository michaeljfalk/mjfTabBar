Package.describe({
    name: 'michaelfalk:mjf-tab-bar',
    version: '1.0.872',
    summary: 'Creates a basic tab bar inside the associated div element',
    git: 'https://github.com/michaeljfalk/mjfTabBar.git',
    documentation: 'README.md'
});

Package.onUse(function(api) {
    api.use('jquery@1.0.2');
    api.addFiles('mjf-tab-bar.js', 'client');
});
