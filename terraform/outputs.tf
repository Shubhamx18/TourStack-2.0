output "cluster_name" {
  value = aws_eks_cluster.main.name
}

output "ssh_private_key" {
  value     = tls_private_key.eks_nodes.private_key_pem
  sensitive = true
}
