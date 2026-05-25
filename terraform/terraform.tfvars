proxmox_url      = "https://192.168.100.50:8006"
proxmox_username = "root@pam"
proxmox_password = "CHANGE_ME"
proxmox_node     = "pve-main"

# VM specifications
vm_id         = 110
vm_cpu        = 4
vm_memory     = 8192
vm_disk_size  = 50
vm_storage    = "local-lvm"

# Network
vm_ip_address = "192.168.100.120"
vm_ip_gateway = "192.168.100.1"
vm_ip_cidr    = "24"

# SSH
ssh_public_key_path = "~/.ssh/id_rsa.pub"

# Cloudflare
cloudflare_zone_id    = "CHANGE_ME_ZONE_ID"
cloudflare_api_token  = "CHANGE_ME_API_TOKEN"

api_domain = "api-whatsupearth.angelonesto.com"
app_domain = "whatsupearth.angelonesto.com"

# Docker Hub
dockerhub_username = "onesto"
dockerhub_token    = "CHANGE_ME_DOCKER_TOKEN"

# GitHub
github_repo = "https://github.com/SinckCode/whatsup-earth.git"
