data "aws_iam_role" "eks_cluster_role" {
  name = "eks-cluster-role-${var.cluster_name}"
}

data "aws_iam_role" "node_group_role" {
  name = "eks-node-group-role-${var.cluster_name}"
}
