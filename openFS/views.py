#-*-coding:UTF-8 -*-
from django.shortcuts import render_to_response
from django.template import loader, Context
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import auth
from models import Users
import models
import json
from django.core import serializers
import rpyc
import re
from pandas import DataFrame,Series
import pandas as pd

def login(request):
    username = request.GET.get('username', None)
    password = request.GET.get('password', None)
    if username is not None:
        userList = Users.objects.all()
        for user in userList:
            if user.username == username and user.password == password:
                request.session['username'] = username
                return index(request)
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
    #return render_to_response('home.html',{'groupsObjects':groups})
    return index(request)
    


def index(request):
    groups=models.Groups.objects.all()
    Users=models.User.objects.all()
    return render_to_response('home.html',{'groupsObjects':groups,'UsersObjects':Users})


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
    #return render_to_response('home.html',{'groupsObjects':groups})
    return index(request)

def delete(request):
    ID=request.GET['editGroupID']
    models.Groups.objects.filter(groupID=ID).delete()
    groups=models.Groups.objects.all()
    #return render_to_response('home.html',{'groupsObjects':groups})
    return index(request)

def manipulate(request):
    if "editGroup" in request.GET:
        return edit(request)
    elif "deleteGroup" in request.GET:
        return delete(request)
    elif "addGroup" in request.GET:
        return addGroup(request)

def format(res):
    line=re.split(r'\n',res)
    record={}
    names=re.split('\s+',line[0].strip())
    for li in line[1:]:
        sp=re.split(r'\s+',li.strip())
        record.setdefault(sp[0],{})
        index=1
        for i in sp[1:]:
            record[sp[0]][names[index]]=i
            index+=1
    return json.dumps(record).encode('utf8')

def run_command(request):
    command=request.GET.get('val','')
    try:
        conn=rpyc.connect('localhost',9999)
        res=conn.root.run(command)
        if command=="df":
            res=format(res)
	elif command=="free -m":
	    res=conn.root.Runcommands(command)
            res=memory_format(res)
	elif command=="cat /proc/stat":
	    res=conn.root.Runcommands(command)
            res=cpuUse(res)
    except Exception,e:
        res=str(e)
    return HttpResponse(res)

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
    p=models.User(userID=ID,username=Name,password=Password,fullname=FullName,email=EMail,sshkey=SSHKey,groupName=GroupName)
    p.save()
    return HttpResponse(0)

def refreshHome(request):
    Users=models.User.objects.all()
    return index(request)

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

def ViewGroups(request):
    groupID=request.GET.get['groupID',None]
    groupName=request.GET.get['GroupName',None]
    BuiltInGroup=request.GET.get['BuiltInGroup',None]
    permitSudo=request.GET.get['permitSudo',None]
    # if groupID is not None:
    groupList = models.Groups.objects.all()
        # for groupID in groupList:
        #     if groups.groupID == groupID and groups.groupName == groupName and groups.BuiltInGroup == BuiltInGroup and groups.permitSudo == permitSudo  :
        #         request.session['groupID']=groupID
        #         #return render_to_response('home.html', {'groupID':groupID})
    print groupList
    return index(request)

def cpuUse(res):
    line=re.split(r'\n',res)
    record={}
    print line[0]
    names=["user","nice","system","idle","iowait","irq","softirq"]
    #print names[1]
    for li in line[0:]:
        sp=re.split(r'\s+',li.strip())
        record.setdefault(sp[0],{})
        print "sp[0]="+sp[0]
        index=0
        j=0
        for i in sp[0:]:
            j+=1
            if j==1:
                continue
            if j==8:
                break
            record[sp[0]][names[index]]=i
            print "names[index]="+names[index]+" i="+i
            index+=1
        break
    return json.dumps(record).encode('utf8')

def memory_format(res):
    line=re.split(r'\n',res)
    record={}
    print line[0]
    names=re.split('\s+',line[0].strip())
    for li in line[1:]:
        sp=re.split(r'\s+',li.strip())
        record.setdefault(sp[0],{})
        print "sp[0]="+sp[0]
        index=0
        for i in sp[1:]:
            record[sp[0]][names[index]]=i
            print "names[index]="+names[index]+" i="+i
            index+=1
        break
    return json.dumps(record).encode('utf8')

def get(request):
    id = request.GET.get('id', None)

    if id == 'account':
        account = request.GET.get('account', None)
        if account == 'user':
            lists = models.User.objects.all()

    if id == 'reporting':
        reporting = request.GET.get('reporting', None)
        names = ['Michael', 'Bob']

    return render_to_response('contentR.html', locals())
    return render_to_response('contentR.html', {'groupsObjects':groups,'UsersObjects':Users,'lists':lists})

