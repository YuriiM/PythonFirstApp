from django.conf.urls import patterns, url

from ITBS import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
    #url(r'^select_clients/', views.select_clients, name='select_clients'),
    #url(r'^delete_client/', views.delete_client, name='delete_client'),
    #url(r'^add_client/', views.add_client, name='add_client'),
    #url(r'^upd_prepare/', views.upd_prepare, name='upd_prepare'),
    #url(r'^update_client/', views.update_client, name='update_client'),
)