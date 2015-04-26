#-*-coding:UTF-8 -*-
from django.shortcuts import render_to_response
from django.template import loader, Context
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from models import Users
import models
import json
from django.core import serializers




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


def checkAddGroup(request):
    ID = request.GET.get('addGroupID', None)
    name = request.GET.get('addGroupName', None)
    if ID is not None:
        obj=models.Groups.objects.filter(groupID=ID)
        if len(obj)!=0:
            return HttpResponse("false")
        else:
            return HttpResponse("true")
    if name!=None:
        obj=models.Groups.objects.filter(groupName=name)
        if len(obj)!=0:
            return HttpResponse("false")
        else:
            return HttpResponse("true")

def addGroup(request):
    ID=request.GET['addGroupID']
    Name=request.GET['addGroupName']
    if 'permitSudo' in request.GET:
        permitSudo=True
    else:
        permitSudo=False
    if 'allowRepeatedGIDs' in request.GET:
        repeated=True
    else:
        repeated=False
    groups=models.Groups.objects.all()
    obj=models.Groups.objects.filter(groupID=ID)
    if len(obj)!=0:
        return render_to_response('home.html',{'groupsObjects':groups})
    p=models.Groups(groupID=ID,groupName=Name,permitSudo=permitSudo, allowedRepeat=repeated)
    p.save()
    return render_to_response('home.html',{'groupsObjects':groups})


def index(request):
    groups=models.Groups.objects.all()
    return render_to_response('home.html',{'groupsObjects':groups})


def search(request):
    name=request.GET["groupName"]
    obj=models.Groups.objects.filter(groupName=name)
    data = serializers.serialize("json", obj)
    return HttpResponse(data)

def edit(request):
    Name=request.GET['editGroupName']
    if 'permitSudo123' in request.GET:
        permitSudo123=True
    else:
        permitSudo123=False
    ID=request.GET['editGroupID']
    models.Groups.objects.filter(groupID=ID).update(groupName=Name,permitSudo=permitSudo123)
    groups=models.Groups.objects.all()
    return render_to_response('home.html',{'groupsObjects':groups})

def delete(request):
    ID=request.GET['editGroupID']
    models.Groups.objects.filter(groupID=ID).delete()
    groups=models.Groups.objects.all()
    return render_to_response('home.html',{'groupsObjects':groups})

def manipulate(request):
    if "editGroup" in request.GET:
        return edit(request)
    elif "deleteGroup" in request.GET:
        return delete(request)
    elif "addGroup" in request.GET:
        return addGroup(request)






