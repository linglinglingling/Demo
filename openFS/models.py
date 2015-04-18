from django.db import models

# Create your models here.
class Users(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=20)

    def __str__(self):
        return '%s' %(self.username)


class Groups(models.Model):
    groupID=models.IntegerField()
    groupName=models.CharField(max_length=50)
    permitSudo=models.BooleanField(default=True)
    allowedRepeat=models.BooleanField(default=True)

    def __unicode__(self):
        return str(self.groupID)+'\t'+str(self.groupName)+'\t'+str(self.permitSudo)+'\t'+str(self.allowedRepeat)