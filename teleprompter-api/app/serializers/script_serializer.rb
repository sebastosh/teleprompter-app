class ScriptSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content
end
