variable "proxmox_url" {
  description = "URL del Proxmox API"
  type        = string
  default     = "https://192.168.100.50:8006"
}

variable "proxmox_username" {
  description = "Usuario Proxmox"
  type        = string
  default     = "root@pam"
}

variable "proxmox_password" {
  description = "Contraseña Proxmox"
  type        = string
  sensitive   = true
}

variable "proxmox_node" {
  description = "Nombre del nodo Proxmox"
  type        = string
  default     = "pve-main"
}

# VM specifications
variable "vm_id" {
  description = "VMID para la nueva VM"
  type        = number
  default     = 110 # Usar ID disponible
}

variable "vm_cpu" {
  description = "Número de CPUs"
  type        = number
  default     = 4
}

variable "vm_memory" {
  description = "RAM en MB"
  type        = number
  default     = 8192
}

variable "vm_disk_size" {
  description = "Tamaño del disco en GB"
  type        = number
  default     = 50
}

variable "vm_storage" {
  description = "Storage pool Proxmox"
  type        = string
  default     = "local-lvm"
}

# Network
variable "vm_ip_address" {
  description = "IP estática para la VM"
  type        = string
  default     = "192.168.100.120"
}

variable "vm_ip_gateway" {
  description = "Gateway de la red"
  type        = string
  default     = "192.168.100.1"
}

variable "vm_ip_cidr" {
  description = "CIDR de la red"
  type        = string
  default     = "24"
}

# SSH
variable "ssh_public_key_path" {
  description = "Ruta a la clave pública SSH"
  type        = string
  default     = "~/.ssh/id_rsa.pub"
}

# Cloudflare
variable "cloudflare_zone_id" {
  description = "Cloudflare Zone ID"
  type        = string
  sensitive   = true
}

variable "cloudflare_api_token" {
  description = "Cloudflare API Token"
  type        = string
  sensitive   = true
}

variable "api_domain" {
  description = "Dominio API"
  type        = string
  default     = "api-whatsupearth.angelonesto.com"
}

variable "app_domain" {
  description = "Dominio App"
  type        = string
  default     = "whatsupearth.angelonesto.com"
}

# Docker Hub
variable "dockerhub_username" {
  description = "Docker Hub username"
  type        = string
}

variable "dockerhub_token" {
  description = "Docker Hub token"
  type        = string
  sensitive   = true
}

# GitHub
variable "github_repo" {
  description = "GitHub repository URL"
  type        = string
  default     = "https://github.com/SinckCode/whatsup-earth.git"
}
