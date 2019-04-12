//Handling writing of files

var fs = require('fs');
var path = require('path');

var lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname,'/../.data/');


lib.create = function(dir,file,data,callback){
    //open the file for writing
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){

            var stringData = JSON.stringify(data);

            //write to the file
            fs.writeFile(fileDescriptor,stringData,function(err){
                if(!err){
                    fs.close(fileDescriptor,function(err){
                        if(!err){
                            callback(false);
                        }else{
                            callback("Error in closing the file");
                        }
                    })
                }else{
                  callback("Error in writing the file");  
                }
            });
        }else{
            callback("Failed to create the new file It might be existing!");
        }
    });
};


lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        callback(err,data);
    });
};


lib.update = function(dir,file,data,callback){
 fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor)=>{
    if(!err && fileDescriptor){

        var stringData = JSON.stringify(data);

        fs.ftruncate(fileDescriptor,(err)=>{
            if(!err){
                fs.writeFile(fileDescriptor,stringData,(err)=>{
                    if(!err){
                        fs.close(fileDescriptor,(err)=>{
                            if(!err){
                                callback(false);
                            }else{
                               callback("Failed to close the File"); 
                            }
                        });
                    }else{
                        callback("Failed to write File");
                    }
                });
            }else{
                callback("Failed to truncate");
            }
        });
    }else{
        callback("Failed to create the new file It might be existing!");
    };
 });
};

lib.delete = function(dir,file,callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            callback(false);
        }else{
            callback("Failed to unlink!");
        }
    })
};

module.exports = lib;