terraform {
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = "~> 2.9"
    }
  }
}

provider "proxmox" {
  pm_api_url      = "${var.proxmox_url}/api2/json"
  pm_user         = var.proxmox_username
  pm_password     = var.proxmox_password
  pm_tls_insecure = true
}

# Crear VM en Proxmox clonando desde template
resource "proxmox_vm_qemu" "whatsup_earth_vm" {
  name = "whatsup-earth"
  target_node = var.proxmox_node
  vmid = var.vm_id

  # Clonar desde template
  clone = "ubuntu-template"
  full_clone = false

  # Especificaciones
  cores = var.vm_cpu
  memory = var.vm_memory

  # Storage
  storage = var.vm_storage
  disk_gb = var.vm_disk_size

  # Network
  network {
    model = "virtio"
    bridge = "vmbr0"
  }

  # IP Configuration
  ipconfig0 = "ip=${var.vm_ip_address}/${var.vm_ip_cidr},gw=${var.vm_ip_gateway}"

  # SSH Key
  sshkeys = file(var.ssh_public_key_path)

  tags = "whatsup-earth"
}

output "vm_ip" {
  value = var.vm_ip_address
}

output "vm_name" {
  value = proxmox_vm_qemu.whatsup_earth_vm.name
}
