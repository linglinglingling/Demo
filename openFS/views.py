#-*-coding:UTF-8 -*-
from django.shortcuts import render_to_response
from django.template import loader, Context
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from models import Users
import models
import json




def login(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    if username is not None:
        userList = Users.objects.all()
        for user in userList:
            if user.username == username and user.password == password:
                request.session['username'] = username
                return render_to_response('home.html', {'username': username})
    return render_to_response('login.html')


# def login(request):
# 	username = request.POST['username']
# 	password = request.POST['password']
# 	user = auth.authenticate(username=username, password=password)
# 	if user is not None and user.is_active:
# 	 # Correct password, and the user is marked "active"
# 		auth.login(request, user)
# 		# 重新加载主页
# 		if (username=='winston'):
# 			return HttpResponseRedirect("http://127.0.0.1:8000/index/")
# 		else:
# 			return HttpResponseRedirect("http://127.0.0.1:8000/")
# 	else:
# 		# 返回登录界面
#
# 		return render_to_response('login.html')


def addGroup(request):
    result={}
    ID=request.GET['groupID']
    Name=request.GET['GroupName']
    if 'permitSudo' in request.GET:
        permitSudo=True
    else:
        permitSudo=False
    if 'allowRepeatedGIDs' in request.GET:
        repeated=True
    else:
        repeated=False
    id=models.Groups.objects.filter(groupID=ID)
    if len(id)!=0:
        return HttpResponse(2)
    name=models.Groups.objects.filter(groupName=Name)
    if len(name)!=0:
        return HttpResponse(1)
    # message=ID+'\t'+Name+'\t'+str(permitSudo)+'\t'+str(repeated);
    p=models.Groups(groupID=ID,groupName=Name,permitSudo=permitSudo, allowedRepeat=repeated)
    p.save()
    return HttpResponse(0)

def refreshHome(request):
    groups=models.Groups.objects.all()
    return render_to_response('home.html',{'groupsObjects':groups})





