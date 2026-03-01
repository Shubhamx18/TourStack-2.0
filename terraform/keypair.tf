resource "tls_private_key" "eks_nodes" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "eks_nodes" {
  key_name   = "eks-nodes-${var.cluster_name}"
  public_key = tls_private_key.eks_nodes.public_key_openssh
}

resource "local_file" "private_key" {
  content         = tls_private_key.eks_nodes.private_key_pem
  filename        = "${path.module}/eks-nodes.pem"
  file_permission = "0600"
}
