from django.conf.urls import patterns, include, url
from django.contrib import admin
from openFS import views
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'Demo.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/$', views.login),
    url(r'^ajax/checkAddUser/',views.addUser),
    url(r'^ajax/checkEditUser/',views.EditUser),
    url(r'^ajax/deleteUser/',views.DeleteUser),
    url(r'^ajax/getUser/',views.getUser),
    url(r'^home/$',views.refreshHome),
    url(r'^ajax/getGroup/$',views.getGroup),
)
