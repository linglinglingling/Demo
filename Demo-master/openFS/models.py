from django.db import models

# Create your models here.
class Users(models.Model):
    userID=models.IntegerField(default=0)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)
    fullname = models.CharField(max_length=30)
    email = models.EmailField(unique = True, verbose_name = 'Email')
    sshkey = models.CharField(max_length=300)
    groupName=models.CharField(max_length=50)

    def __unicode__(self):
        return str(self.UserID)+'\t'+str(self.username)+'\t'+str(self.password)

class Groups(models.Model):
    groupID=models.IntegerField()
    groupName=models.CharField(max_length=50)

    def __unicode__(self):
        return str(self.groupID)+'\t'+str(self.groupName)