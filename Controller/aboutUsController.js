import config from '../Configuration/ConfigDB.js';
import { infoLabModel } from '../Module/infoLabModel.js';

const getLabInfo = async (req, res) => {
    try {
        const labInfo = await infoLabModel();
        if(labInfo) {
            res.render("auth/aboutUs",{labInfo: labInfo});
        }else {
            res.status(404).json({message:"labInfo not found"});
        }
    }catch(err) {
        console.error(err);
        res.status(500).json({message:"server error"});
    }
}

export default getLabInfo;