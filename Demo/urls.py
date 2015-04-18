from django.conf.urls import patterns, include, url
from django.contrib import admin
from openFS import views
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Demo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', views.login),
    url(r'^ajax/checkAddGroup/',views.addGroup),
    url(r'^home/$',views.refreshHome)
)
