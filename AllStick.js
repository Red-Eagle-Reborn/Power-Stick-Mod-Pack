/*
                    Red Eagle General License
                       Version 3, 05/06/2015
                       
  You Are Not Allowed To Copying or Using Our Code Without Our Permission.
  You Are Allowed To Copying or Using Our Code If You Are Have A Permisson From Leader Or Mods Creator.
  Don't Claim Our Mods To Be Yours.
  Don't Moditified Out Mods To YOur Version.
  
  Mod Creator : respectZ
  Mod Release Date : 09/06/2015
  
  By Team Red Eagle.
*/

var RER = {
    newPowerStick: function(item,texture,texturedata,langName,realName,ability) {
        ModPE.setItem(item,texture,texturedata,langName,1);
        ModPE.langEdit("item." +langName + ".name",realName);
        Player.addItemCreativeInv(item,1,0);
        RER.stick.push([item,ability]);
    },
    stick:[],
    chat:function(str) {
        clientMessage("§c[RER] §f"+str);
    },
    freezestick:[]
    
}

RER.newPowerStick(700,"blaze_rod",0,"RER.freezestick","Freeze Stick","FREEZE");
RER.newPowerStick(701,"blaze_powder",0,"RER.firestick","Fire Stick","FIRE");
RER.newPowerStick(702,"cauldron",0,"RER.explodestick","Explode Stick","EXPLODE")
RER.newPowerStick(703,"iron_horse_armor",0,"RER.lifestick","Life Stick","LIFE")

function attackHook(a,v) {
    if(a==getPlayerEnt()) {
        for(var i in RER.stick) {
        if(getCarriedItem()==RER.stick[i][0]) {
            var ability = RER.stick[i][1];
            if(ability=="FREEZE") {
                var rnd = Math.floor(Math.random()*(100)+40);
                RER.freezestick.push({ent:v,time:rnd});
            } else {
                if(ability=="FIRE") {
                    var firernd = Math.floor(Math.random()*(6)+1);
                    Entity.setFireTicks(v,firernd);
                }
                if(ability=="EXPLODE") {
                    var rndexplode = Math.floor(Math.random()*(7)+(1));
                    explode(Entity.getX(v),Entity.getY(v),Entity.getZ(v),rndexplode);
                    Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt()));
                }
                if(ability=="LIFE") {
                    if(Entity.getHealth(getPlayerEnt())<20) {
                        Entity.setHealth(getPlayerEnt(),Entity.getHealth(getPlayerEnt())+1);
                    }
                }
            }
        }
        }
    }
}

function modTick() {
    if(RER.freezestick.length!==0) {
        for(var t=0;t<RER.freezestick.length;t++) {
            RER.freezestick[t].time--;
            if(RER.freezestick[t].time>0) {
                Entity.setVelX(RER.freezestick[t].ent,0)
                Entity.setVelY(RER.freezestick[t].ent,0)
                Entity.setVelZ(RER.freezestick[t].ent,0)
            }
            if(RER.freezestick[t].time<=0) {
                RER.freezestick.splice(t,1)
            }
                
        }
    }
}

function newLevel() {
    RER.chat("§6PowerStick Mod Pack by §c[RER]Team")
}

function procCmd(cmd) {
    var c=cmd.split(" ");
    if(c[0]=="powerstick") {
        for(var k in RER.stick) {
        addItemInventory(RER.stick[k][0],1,0);
        RER.chat("§aGived All PowerStick");
        }
    }
}
