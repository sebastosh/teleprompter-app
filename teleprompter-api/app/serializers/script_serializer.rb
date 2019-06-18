class ScriptSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :content
  belongs_to :speaker
end
