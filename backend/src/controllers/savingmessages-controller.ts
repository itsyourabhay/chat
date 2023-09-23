import { json } from "body-parser";
import Messages from "../models/messages";
import User from "../models/userTable";

export async function sendMessgaes(req: any, res: any, next: any) {
  try {
    console.log(req.user);
    const message = await Messages.create({
      Name: req.user.Name,
      Email: req.user.Email,
      userId: req.user.id,
      Message: req.body.message,
    });
    if (message) {
      res.status(200).json({ success: true, data: message });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
}

export async function getMessages(req: any, res: any, next: any) {
  try {
    let query = req.query.lastid as any;
    if (query == "undefined") {
      query = 0;
    } else {
      query = Number(req.query.lastid.trim());
    }
    console.log(req.query);
    console.log(query, "<<<<<<<<<<");
    const message = await Messages.findAll({ offset: query });

    if (message) {
      res.json({ success: true, data: message });
    }
  } catch (err) {
    res.json({ success: true, data: err });
    console.log(err);
  }
}
