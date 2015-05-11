

# models.py
class Groups(models.Model):
    groupID=models.IntegerField()
    groupName=models.CharField(max_length=50)
    permitSudo=models.BooleanField(default=True)
    allowedRepeat=models.BooleanField(default=True)

    def __unicode__(self):
        return str(self.groupID)+'\t'+str(self.groupName)+'\t'+str(self.permitSudo)+'\t'+str(self.allowedRepeat)


#　views.py
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

