from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from .models import DGGalleryPlugin
from django.utils.translation import ugettext as _

class CMSGalleryPlugin(CMSPluginBase):
    model = DGGalleryPlugin
    name = _("Digital Glarus Gallery")
    render_template = "digitalglarus/gallery.html"

    def render(self, context, instance, placeholder):
        context.update({
            'gallery':instance.dgGallery,
            'object':instance,
            'placeholder':placeholder
        })
        return context

plugin_pool.register_plugin(CMSGalleryPlugin)
