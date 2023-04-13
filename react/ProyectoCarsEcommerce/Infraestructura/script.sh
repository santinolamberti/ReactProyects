#!/bin/bash
# -*- ENCODING: UTF-8 -*-
ssh -i "keysG3.pem" ubuntu@ec2-3-135-186-132.us-east-2.compute.amazonaws.com 
cd grupo-3/Backend/Proyecto.Integrador.Grupo3/target
java -jar Proyecto.Integrador-0.0.1-SNAPSHOT.jar
exit
