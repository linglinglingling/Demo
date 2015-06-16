#-*-coding:UTF-8 -*-
from django.shortcuts import render_to_response
from django.template import loader, Context
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from models import Users
from models import User
import models
import json
from django.core import serializers

def login(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    if username is not None:
        userList = models.Users.objects.all()
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

def addUser(request):
    ID=request.GET['UserID']
    Name=request.GET['UserName']
    Password=request.GET['UserPassword']
    FullName=request.GET['FullName']
    EMail=request.GET['EMail']
    SSHKey=request.GET['SSHKey']
    GroupName=request.GET['groupName']
    id=models.User.objects.filter(userID=ID)
    if len(id)!=0:
        return HttpResponse(2)
    name=models.Users.objects.filter(username=Name)
    if len(name)!=0:
        return HttpResponse(1)
    p=models.Users(userID=ID,username=Name,password=Password,fullname=FullName,email=EMail,sshkey=SSHKey,groupName=GroupName)
    p.save()
    return HttpResponse(0)

def refreshHome(request):
    Users=models.User.objects.all()
    return render_to_response('home.html',{'UsersObjects':Users})

def getUser(request):
    name=request.GET['UserName']
    User=models.User.objects.filter(username=name)
    data = serializers.serialize("json", User)
    return HttpResponse(data)

def EditUser(request):
    ID=request.GET['UserID']
    Name=request.GET['UserName']
    Password=request.GET['UserPassword']
    FullName=request.GET['FullName']
    EMail=request.GET['EMail']
    SSHKey=request.GET['SSHKey']
    GroupName=request.GET['groupName']
    # name=models.Users.objects.filter(username=Name)
    # if len(name)!=0:
    #     return HttpResponse(1)
    models.User.objects.filter(userID=ID).update(username=Name,password=Password,fullname=FullName,email=EMail,sshkey=SSHKey,groupName=GroupName)
    return HttpResponse(0)

def DeleteUser(request):
    ID=request.GET['UserID']
    models.User.objects.filter(userID=ID).delete()
    return HttpResponse(0)

def getGroup(request):
    Groups=models.Groups.objects.all()
    data = serializers.serialize("json", Groups)
    return HttpResponse(data)
